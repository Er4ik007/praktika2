import random
import secrets
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, Request as FastAPIRequest
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

import models
import schemas
import auth
from database import get_db
from utils import send_gmail, _admin_codes

router = APIRouter(prefix="/api", tags=["auth"])
limiter = Limiter(key_func=get_remote_address)


@router.post("/register", response_model=schemas.UserResponse)
@limiter.limit("5/minute")
def register_user(request: FastAPIRequest, user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Пользователь с таким email уже существует")
    
    hashed_pwd = auth.hash_password(user.password)
    verification_token = secrets.token_urlsafe(32)
    new_user = models.User(
        name=user.name, email=user.email, password_hash=hashed_pwd,
        phone=user.phone, email_verified=False, verification_token=verification_token
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    verify_url = f"https://praktika2-eta.vercel.app/verify-email?token={verification_token}"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; text-align: center;">
      <h2 style="color: #1a1a1a; margin-bottom: 8px;">Подтвердите ваш email</h2>
      <p style="color: #666; font-size: 16px; margin-bottom: 24px;">
        Здравствуйте, {user.name}! Нажмите кнопку ниже, чтобы подтвердить адрес электронной почты и активировать аккаунт.
      </p>
      <a href="{verify_url}" style="display: inline-block; background-color: #ef4444; color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 50px; font-weight: bold; font-size: 16px;">
        Подтвердить email
      </a>
      <p style="color: #999; font-size: 13px; margin-top: 24px;">
        Если вы не регистрировались на Minsk Gastro Guide — просто проигнорируйте это письмо.
      </p>
    </div>
    """
    send_gmail(
        to=user.email,
        subject="Подтвердите email — Minsk Gastro Guide",
        body=html_body,
        content_type="html"
    )

    return new_user 


@router.post("/login")
@limiter.limit("10/minute")
def login_user(request: FastAPIRequest, user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not auth.verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    
    if not db_user.email_verified:
        raise HTTPException(status_code=403, detail="Подтвердите ваш email перед входом")
    
    if db_user.is_admin:
        admin_code = str(random.randint(1000, 9999))
        code_saved = False
        try:
            db_user.admin_code = admin_code
            db_user.admin_code_expires = datetime.now(timezone.utc) + timedelta(minutes=10)
            db.commit()
            code_saved = True
        except Exception:
            db.rollback()

        if not code_saved:
            _admin_codes[db_user.email] = {
                "code": admin_code,
                "expires": datetime.now(timezone.utc) + timedelta(minutes=10)
            }

        send_gmail(
            to=db_user.email,
            subject="Код подтверждения входа — Minsk Gastro Guide",
            body=(
                f"Здравствуйте, {db_user.name}!\n\n"
                f"Код для входа в панель администратора: {admin_code}\n\n"
                f"Код действителен 10 минут. Если вы не запрашивали вход — проигнорируйте это письмо."
            )
        )

        return {"requires_2fa": True, "email": db_user.email}
    
    token = auth.create_access_token({"sub": str(db_user.id)})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user_name": db_user.name,
        "is_admin": False
    }


@router.post("/verify-email")
def verify_email(payload: schemas.VerifyEmailRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.verification_token == payload.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Неверный или использованный токен")
    user.email_verified = True
    user.verification_token = None
    db.commit()
    return {"message": "Email подтверждён"}


@router.post("/forgot-password")
@limiter.limit("3/minute")
def forgot_password(request: FastAPIRequest, data: schemas.ForgotPassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        return {"message": "Если email существует, код отправлен"}

    reset_code = str(random.randint(1000, 9999))
    user.reset_code = reset_code
    user.reset_code_expires = datetime.now(timezone.utc) + timedelta(minutes=15)
    db.commit()

    send_gmail(
        to=user.email,
        subject="Восстановление пароля - Minsk Gastro Guide",
        body=f"Здравствуйте, {user.name}!\n\nВаш код для восстановления пароля на сайте Minsk Gastro Guide: {reset_code}\n\nКод действителен 15 минут."
    )

    return {"message": "Код отправлен на почту"}


@router.post("/reset-password")
@limiter.limit("5/minute")
def reset_password(request: FastAPIRequest, data: schemas.ResetPassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    
    expire_time = user.reset_code_expires
    if expire_time.tzinfo is None:
        expire_time = expire_time.replace(tzinfo=timezone.utc)

    if expire_time < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Код просрочен")
    
    user.password_hash = auth.hash_password(data.new_password)
    user.reset_code = None
    user.reset_code_expires = None
    db.commit()

    return {"message": "Пароль успешно изменен"}


@router.post("/send-change-code")
def send_change_code(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    reset_code = str(random.randint(1000, 9999))
    current_user.reset_code = reset_code
    current_user.reset_code_expires = datetime.now(timezone.utc) + timedelta(minutes=15)
    db.commit()

    send_gmail(
        to=current_user.email,
        subject="Смена пароля - Minsk Gastro Guide",
        body=(
            f"Здравствуйте, {current_user.name}!\n\n"
            f"Вы запросили смену пароля на сайте Minsk Gastro Guide.\n"
            f"Ваш код подтверждения: {reset_code}\n\n"
            f"Код действителен 15 минут. Если вы не запрашивали смену пароля — проигнорируйте это письмо."
        )
    )

    return {"message": "Код подтверждения отправлен на почту"}


@router.post("/change-password")
def change_password(
    data: schemas.ChangePassword,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if not current_user.reset_code or current_user.reset_code != data.code:
        raise HTTPException(status_code=400, detail="Неверный код подтверждения")

    expire_time = current_user.reset_code_expires
    if expire_time.tzinfo is None:
        expire_time = expire_time.replace(tzinfo=timezone.utc)

    if expire_time < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Код просрочен")

    current_user.password_hash = auth.hash_password(data.new_password)
    current_user.reset_code = None
    current_user.reset_code_expires = None
    db.commit()

    return {"message": "Пароль успешно изменен"}
