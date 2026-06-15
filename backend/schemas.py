from pydantic import BaseModel, Field, EmailStr
from typing import Optional

# Схема: что мы ОЖИДАЕМ получить от Реакта при РЕГИСТРАЦИИ
class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=20, description="Имя пользователя")
    email: str
    password: str = Field(..., min_length=6, max_length=50)
    # ИСПРАВЛЕНО: Увеличили max_length до 50!
    phone: Optional[str] = Field(None, max_length=50)


# Схема: что мы ОЖИДАЕМ получить при ЛОГИНЕ (имя не нужно)
class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    # Те же ограничения на обновление
    name: Optional[str] = Field(None, min_length=2, max_length=20)
    phone: Optional[str] = Field(None, max_length=50)

# Схема: что мы ОТВЕЧАЕМ Реакту (обрати внимание, пароля тут нет!)
class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str] = None

    class Config:
        from_attributes = True  # Позволяет Pydantic читать данные из базы SQLAlchemy
        

# Что мы ждем от React (только ID заведения, например: {"venue_id": "zerno"})
class FavoriteCreate(BaseModel):
    venue_id: str

# Что мы отвечаем React
class FavoriteResponse(BaseModel):
    venue_id: str
    message: str # Например: "Добавлено" или "Удалено"
    
class ForgotPassword(BaseModel):
    email: str

class ResetPassword(BaseModel):
    email: str
    code: str
    new_password: str = Field(..., min_length=6, max_length=50)