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
    new_user = models.User(name=user.name, email=user.email, password_hash=hashed_pwd)
    
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