from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
import schemas
import auth
from database import get_db
from utils import send_message_email

router = APIRouter(prefix="/api", tags=["messages"])


@router.post("/messages/contact", response_model=schemas.MessageResponse)
def send_contact_message(
    data: schemas.ContactMessageCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user_optional)
):
    user_id = current_user.id if current_user else None
    new_msg = models.Message(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
        source="contact",
        user_id=user_id
    )
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)

    send_message_email(data.name, data.email, data.subject, data.message, "contact")

    return schemas.MessageResponse(
        id=new_msg.id,
        name=new_msg.name,
        email=new_msg.email,
        subject=new_msg.subject,
        message=new_msg.message,
        source=new_msg.source,
        category=new_msg.category,
        created_at=str(new_msg.created_at)
    )


@router.post("/messages/support", response_model=schemas.MessageResponse)
def send_support_message(
    data: schemas.SupportMessageCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    new_msg = models.Message(
        name=data.name,
        email=data.email,
        subject=f"[Поддержка] {data.category}",
        message=data.message,
        source="support",
        category=data.category,
        user_id=current_user.id
    )
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)

    send_message_email(data.name, data.email, f"[Поддержка] {data.category}", data.message, "support", data.category)

    return schemas.MessageResponse(
        id=new_msg.id,
        name=new_msg.name,
        email=new_msg.email,
        subject=new_msg.subject,
        message=new_msg.message,
        source=new_msg.source,
        category=new_msg.category,
        created_at=str(new_msg.created_at)
    )
