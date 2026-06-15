import os
import random
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware # <--- ИМПОРТИРУЕМ CORS
from sqlalchemy.orm import Session
from database import engine, Base, get_db
import models
import schemas
import auth

# Создаем таблицы
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Minsk Gastro Guide API",
    description="Backend для путеводителя по заведениям Минска",
    version="1.0.0"
)

# ==========================================
# НАСТРОЙКА CORS (ОТКРЫВАЕМ ДВЕРИ ДЛЯ ФРОНТЕНДА)
# ==========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # В рабочей версии тут будет ссылка на Vercel, пока разрешаем всем
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем GET, POST, OPTIONS и т.д.
    allow_headers=["*"],  # Разрешаем любые заголовки (включая токены)
)

@app.get("/")
def read_root():
    return {"status": "success", "message": "API работает!"}

@app.post("/api/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")
    
    hashed_pwd = auth.hash_password(user.password)
    new_user = models.User(name=user.name, email=user.email, password_hash=hashed_pwd, phone=user.phone)
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user) 
    
    return new_user 

@app.post("/api/login")
def login_user(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    
    token = auth.create_access_token({"sub": str(db_user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_name": db_user.name
    }
    
    # === НОВЫЙ МАРШРУТ: ПОЛУЧЕНИЕ ПРОФИЛЯ ===
# Обрати внимание на Depends(auth.get_current_user) - сюда нельзя без токена!
@app.get("/api/users/me", response_model=schemas.UserResponse)
def get_user_profile(current_user: models.User = Depends(auth.get_current_user)):
    # Если функция дошла сюда, значит охранник пропустил нас. 
    # В current_user уже лежат данные того, чей токен мы прислали.
    return current_user

@app.post("/api/favorites/toggle", response_model=schemas.FavoriteResponse)
def toggle_favorite(
    favorite: schemas.FavoriteCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user) # Защита: только для авторизованных
):
    # Ищем, есть ли уже такой лайк от этого юзера на это заведение
    existing_fav = db.query(models.Favorite).filter(
        models.Favorite.user_id == current_user.id,
        models.Favorite.venue_id == favorite.venue_id
    ).first()

    if existing_fav:
        # Если лайк найден — удаляем его (Toggle OFF)
        db.delete(existing_fav)
        db.commit()
        return {"venue_id": favorite.venue_id, "message": "Удалено из избранного"}
    else:
        # Если лайка нет — создаем новый (Toggle ON)
        new_fav = models.Favorite(user_id=current_user.id, venue_id=favorite.venue_id)
        db.add(new_fav)
        db.commit()
        return {"venue_id": favorite.venue_id, "message": "Добавлено в избранное"}


@app.get("/api/favorites")
def get_user_favorites(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    # Находим все лайки этого пользователя
    favorites = db.query(models.Favorite).filter(models.Favorite.user_id == current_user.id).all()
    
    # Извлекаем из объектов БД только список строк (ID заведений)
    # Получится массив вроде: ['zerno', 'lidbeer']
    venue_ids = [fav.venue_id for fav in favorites]
    return venue_ids


@app.post("/api/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # === ДОБАВЬ ЭТУ СТРОЧКУ ДЛЯ ОТЛАДКИ ===
    print("=== ДАННЫЕ ПРИШЛИ НА СЕРВЕР ==>", user.dict())
    
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")
    
    # 2. Шифруем пароль
    hashed_pwd = auth.hash_password(user.password)
    
    # 3. СОЗДАЕМ ПОЛЬЗОВАТЕЛЯ И ОБЯЗАТЕЛЬНО ПЕРЕДАЕМ phone!
    # Раньше было: new_user = models.User(name=user.name, email=user.email, password_hash=hashed_pwd)
    new_user = models.User(
        name=user.name, 
        email=user.email, 
        phone=user.phone, # <--- ВОТ ЭТА СТРОЧКА!
        password_hash=hashed_pwd
    )
    
    # 4. Сохраняем в базу
    db.add(new_user)
    db.commit()
    db.refresh(new_user) 
    
    return new_user 

# НОВАЯ ФУНКЦИЯ ДЛЯ СОХРАНЕНИЯ ПРОФИЛЯ
@app.patch("/api/users/me", response_model=schemas.UserResponse)
def update_user_profile(
    user_update: schemas.UserUpdate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    if user_update.name is not None:
        current_user.name = user_update.name
    if user_update.phone is not None:
        current_user.phone = user_update.phone
        
    db.commit()
    db.refresh(current_user)
    return current_user

# ==========================================
# УДАЛЕНИЕ И РЕДАКТИРОВАНИЕ АККАУНТА
# ==========================================

@app.patch("/api/users/me", response_model=schemas.UserResponse)
def update_user_profile(
    user_update: schemas.UserUpdate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    if user_update.name is not None:
        current_user.name = user_update.name
    if user_update.phone is not None:
        current_user.phone = user_update.phone
        
    db.commit()
    db.refresh(current_user)
    return current_user

@app.delete("/api/users/me")
def delete_user_profile(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    # Благодаря ondelete="CASCADE" в моделях, удаление юзера удалит и его лайки/брони
    db.delete(current_user)
    db.commit()
    return {"message": "Аккаунт успешно удален"}

# ==========================================
# ВОССТАНОВЛЕНИЕ ПАРОЛЯ С ОТПРАВКОЙ НА GMAIL
# ==========================================

@app.post("/api/forgot-password")
def forgot_password(data: schemas.ForgotPassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        # Для безопасности мы не говорим, что email не найден, просто возвращаем ОК
        return {"message": "Если email существует, код отправлен"}

    # 1. Генерируем 4-значный код
    reset_code = str(random.randint(1000, 9999))
    user.reset_code = reset_code
    user.reset_code_expires = datetime.now(timezone.utc) + timedelta(minutes=15)
    db.commit()

    # 2. Отправляем письмо через Gmail
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")
    
    if smtp_user and smtp_password:
        try:
            msg = MIMEText(f"Здравствуйте, {user.name}!\n\nВаш код для восстановления пароля на сайте Minsk Gastro Guide: {reset_code}\n\nКод действителен 15 минут.")
            msg['Subject'] = 'Восстановление пароля - Minsk Gastro Guide'
            msg['From'] = f"Minsk Gastro Support <{smtp_user}>"
            msg['To'] = user.email

            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
        except Exception as e:
            print(f"Ошибка отправки письма: {e}")
            raise HTTPException(status_code=500, detail="Ошибка почтового сервера")

    return {"message": "Код отправлен на почту"}


@app.post("/api/reset-password")
def reset_password(data: schemas.ResetPassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    
    expire_time = user.reset_code_expires
    if expire_time.tzinfo is None:
        expire_time = expire_time.replace(tzinfo=timezone.utc)

    # Сравниваем два таймзон-зависимых времени
    if expire_time < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Код просрочен")
    
    # Шифруем новый пароль и стираем код
    user.password_hash = auth.hash_password(data.new_password)
    user.reset_code = None
    user.reset_code_expires = None
    db.commit()

    return {"message": "Пароль успешно изменен"}