from fastapi import FastAPI
from database import engine, Base
import models # <--- НОВОЕ: Импортируем наши таблицы, чтобы SQLAlchemy их увидела!

# SQLAlchemy читает файл models.py и создает таблицы в базе данных!
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Minsk Gastro Guide API",
    description="Backend для путеводителя по заведениям Минска",
    version="1.0.0"
)

@app.get("/")
def read_root():
    return {
        "status": "success",
        "message": "База данных подключена! Таблицы успешно созданы!"
    }