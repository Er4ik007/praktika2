from fastapi import FastAPI

# Инициализируем наше приложение
app = FastAPI(
    title="Minsk Gastro Guide API",
    description="Backend для путеводителя по заведениям Минска",
    version="1.0.0"
)

# Создаем первый маршрут (Endpoint)
# Метод GET означает, что мы просто запрашиваем данные
@app.get("/")
def read_root():
    return {
        "status": "success",
        "message": "Привет! Сервер Minsk Gastro Guide успешно запущен и работает!"
    }