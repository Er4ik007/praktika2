import bcrypt
import jwt
from datetime import datetime, timedelta

# СЕКРЕТНЫЙ КЛЮЧ
SECRET_KEY = "super_secret_minsk_gastro_key_12345"
ALGORITHM = "HS256"

# 1. Функция: Превращает пароль в "кашу"
def hash_password(password: str) -> str:
    # bcrypt работает только с байтами, поэтому кодируем строку
    pwd_bytes = password.encode('utf-8')
    # Генерируем уникальную "соль" (случайные символы) для усложнения хеша
    salt = bcrypt.gensalt()
    # Шифруем
    hashed_password = bcrypt.hashpw(pwd_bytes, salt)
    # Возвращаем обычную строку, чтобы сохранить в БД
    return hashed_password.decode('utf-8')

# 2. Функция: Проверяет пароль
def verify_password(plain_password: str, hashed_password: str) -> bool:
    password_bytes = plain_password.encode('utf-8')
    hashed_password_bytes = hashed_password.encode('utf-8')
    # Функция checkpw сама понимает "соль" и сравнивает пароли
    return bcrypt.checkpw(password_bytes, hashed_password_bytes)

# 3. Функция: Создает JWT Токен
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)
    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt