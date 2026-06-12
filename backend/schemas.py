from pydantic import BaseModel

# Схема: что мы ОЖИДАЕМ получить от Реакта при РЕГИСТРАЦИИ
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

# Схема: что мы ОЖИДАЕМ получить при ЛОГИНЕ (имя не нужно)
class UserLogin(BaseModel):
    email: str
    password: str

# Схема: что мы ОТВЕЧАЕМ Реакту (обрати внимание, пароля тут нет!)
class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True  # Позволяет Pydantic читать данные из базы SQLAlchemy
        

# Что мы ждем от React (только ID заведения, например: {"venue_id": "zerno"})
class FavoriteCreate(BaseModel):
    venue_id: str

# Что мы отвечаем React
class FavoriteResponse(BaseModel):
    venue_id: str
    message: str # Например: "Добавлено" или "Удалено"