from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

# ==========================================
# ТАБЛИЦА ПОЛЬЗОВАТЕЛЕЙ (Users)
# ==========================================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Связи (Relationship)
    reviews = relationship("Review", back_populates="user")
    bookings = relationship("Booking", back_populates="user")
    # Добавили связь с избранным
    favorites = relationship("Favorite", back_populates="user")

# ==========================================
# НОВОЕ: ТАБЛИЦА ИЗБРАННОГО (Favorites)
# ==========================================
class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    # Кто добавил
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    # Что добавил (ID заведения из твоего data.ts, например 'zerno')
    venue_id = Column(String(50), nullable=False, index=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="favorites")

# ==========================================
# ТАБЛИЦА ОТЗЫВОВ (Reviews)
# ==========================================
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer, nullable=False) 
    text = Column(Text, nullable=False)
    venue_id = Column(String(50), nullable=False, index=True) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="reviews")

# ==========================================
# ТАБЛИЦА БРОНИРОВАНИЙ (Bookings)
# ==========================================
class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    venue_id = Column(String(50), nullable=False)
    venue_name = Column(String(100), nullable=False) 
    date = Column(String(50), nullable=False)
    guests = Column(String(10), nullable=False)
    phone = Column(String(20), nullable=False)
    message = Column(Text, nullable=True) 
    status = Column(String(20), default="active")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="bookings")