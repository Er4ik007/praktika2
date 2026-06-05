import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# 1. Загружаем переменные из файла .env
load_dotenv()

# 2. Получаем ссылку на БД
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("Не найдена переменная DATABASE_URL в файле .env")

# 3. Создаем "Движок" (Engine) — это главная точка входа в базу данных
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 4. Создаем фабрику сессий (SessionLocal). Каждому юзеру, который зайдет на сайт, 
# будет выдаваться своя временная сессия для работы с БД.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 5. Base — это базовый класс. От него мы будем наследовать наши таблицы (Пользователи, Брони и т.д.)
Base = declarative_base()

# 6. Функция для получения сессии базы данных в наших маршрутах (Dependency)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() # Обязательно закрываем соединение после ответа пользователю!