from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

# ==========================================
# ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ (Users)
# ==========================================
class User(Base):
    __tablename__ = "users" # Имя таблицы в PostgreSQL

    # Колонки таблицы
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    
    # Мы храним ХЕШ пароля, а не сам пароль (ради безопасности)
    password_hash = Column(String(255), nullable=False)
    
    # Автоматически ставим дату регистрации
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Связи (чтобы можно было легко достать отзывы и брони этого юзера)
    reviews = relationship("Review", back_populates="user")
    bookings = relationship("Booking", back_populates="user")

# ==========================================
# ТАБЛИЦА ОТЗЫВОВ (Reviews)
# ==========================================
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer, nullable=False) # От 1 до 5
    text = Column(Text, nullable=False)
    venue_id = Column(String(50), nullable=False, index=True) # ID заведения (например, 'vasilki')
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Внешний ключ: привязываем отзыв к конкретному юзеру
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="reviews")

# ==========================================
# ТАБЛИЦА БРОНИРОВАНИЙ (Bookings)
# ==========================================
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    venue_id = Column(String(50), nullable=False)
    venue_name = Column(String(100), nullable=False) # Название заведения для удобства вывода
    date = Column(String(50), nullable=False)
    guests = Column(String(10), nullable=False)
    phone = Column(String(20), nullable=False)
    message = Column(Text, nullable=True) # Пожелания (может быть пустым)
    
    # Статус брони: 'active' или 'cancelled'
    status = Column(String(20), default="active")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="bookings")