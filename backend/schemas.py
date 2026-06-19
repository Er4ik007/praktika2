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
    avatar: Optional[str] = None

    class Config:
        from_attributes = True  # Позволяет Pydantic читать данные из базы SQLAlchemy
        

# Что мы ждем от React (только ID заведения, например: {"venue_id": "zerno"})
class FavoriteCreate(BaseModel):
    venue_id: str

# Что мы отвечаем React
class FavoriteResponse(BaseModel):
    venue_id: str
    message: str

class BookingCreate(BaseModel):
    venue_id: str
    venue_name: str
    name: str
    date: str
    guests: str
    phone: str
    message: Optional[str] = None

class CancelBooking(BaseModel):
    reason: Optional[str] = None

class BookingResponse(BaseModel):
    id: int
    venue_id: str
    venue_name: str
    name: str
    date: str
    guests: str
    phone: str
    message: Optional[str] = None
    cancel_reason: Optional[str] = None
    status: str
    created_at: str

    class Config:
        from_attributes = True

class ForgotPassword(BaseModel):
    email: str

class ResetPassword(BaseModel):
    email: str
    code: str
    new_password: str = Field(..., min_length=6, max_length=50)

class SendChangeCode(BaseModel):
    pass

class ChangePassword(BaseModel):
    code: str
    new_password: str = Field(..., min_length=6, max_length=50)

class ReviewCreate(BaseModel):
    venue_id: str
    rating: int = Field(..., ge=1, le=5)
    text: str = Field(..., min_length=1, max_length=1000)

class ReviewResponse(BaseModel):
    id: int
    rating: int
    text: str
    photos: Optional[list[str]] = None
    venue_id: str
    created_at: str
    user_name: str
    user_avatar: Optional[str] = None
    user_id: int

    class Config:
        from_attributes = True

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=1, max_length=100)
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)

class SupportMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=1, max_length=50)
    message: str = Field(..., min_length=1, max_length=5000)

class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    subject: str
    message: str
    source: str
    category: Optional[str] = None
    created_at: str

    class Config:
        from_attributes = True