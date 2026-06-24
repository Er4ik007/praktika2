import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from sqlalchemy.orm import Session
import models
from database import get_db

# СЕКРЕТНЫЙ КЛЮЧ
SECRET_KEY = "super_secret_minsk_gastro_key_12345"
ALGORITHM = "HS256"

# Указываем FastAPI, где находится URL для получения токена
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

def hash_password(password: str) -> str:
    pwd_bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    return hashed_password.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_bytes = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    return bcrypt.checkpw(password_bytes, hashed_password_bytes)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# === НОВАЯ ФУНКЦИЯ (ОХРАННИК) ===
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учетные данные (Токен недействителен)",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # Пытаемся расшифровать токен нашим секретным ключом
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    # Ищем пользователя в базе по расшифрованному ID
    user = db.query(models.User).filter(models.User.id == int(user_id)).first()
    if user is None:
        raise credentials_exception
        
    return user # Возвращаем объект пользователя (со всеми его данными)


# === ОХРАННИК ДЛЯ АДМИНИСТРАТОРОВ ===
def get_current_admin(current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Доступ запрещён. Требуются права администратора."
        )
    return current_user


# === ОХРАННИК С ОПЦИОНАЛЬНЫМ ТОКЕНОМ ===
def get_current_user_optional(request: Request, db: Session = Depends(get_db)):
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None
    token = auth_header.removeprefix("Bearer ")
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        user = db.query(models.User).filter(models.User.id == int(user_id)).first()
        return user
    except jwt.PyJWTError:
        return None