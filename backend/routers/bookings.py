from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
import auth
from database import get_db

router = APIRouter(prefix="/api", tags=["bookings"])


@router.post("/bookings", response_model=schemas.BookingResponse)
def create_booking(
    booking: schemas.BookingCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    new_booking = models.Booking(
        venue_id=booking.venue_id,
        venue_name=booking.venue_name,
        name=booking.name,
        date=booking.parse_date(),
        guests=booking.guests,
        phone=booking.phone,
        message=booking.message,
        user_id=current_user.id,
        status="active"
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return schemas.BookingResponse(
        id=new_booking.id,
        venue_id=new_booking.venue_id,
        venue_name=new_booking.venue_name,
        name=new_booking.name,
        date=str(new_booking.date),
        guests=new_booking.guests,
        phone=new_booking.phone,
        message=new_booking.message,
        cancel_reason=new_booking.cancel_reason,
        status=new_booking.status,
        created_at=str(new_booking.created_at)
    )


@router.get("/bookings", response_model=list[schemas.BookingResponse])
def get_user_bookings(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    bookings = db.query(models.Booking).filter(
        models.Booking.user_id == current_user.id
    ).order_by(models.Booking.created_at.desc()).all()

    return [
        schemas.BookingResponse(
            id=b.id,
            venue_id=b.venue_id,
            venue_name=b.venue_name,
            name=b.name,
            date=str(b.date),
            guests=b.guests,
            phone=b.phone,
            message=b.message,
            cancel_reason=b.cancel_reason,
            status=b.status,
            created_at=str(b.created_at)
        )
        for b in bookings
    ]


@router.patch("/bookings/{booking_id}/cancel")
def cancel_booking(
    booking_id: int,
    data: schemas.CancelBooking,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    booking = db.query(models.Booking).filter(
        models.Booking.id == booking_id,
        models.Booking.user_id == current_user.id
    ).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Бронирование не найдено")

    if booking.status == "cancelled":
        raise HTTPException(status_code=400, detail="Бронирование уже отменено")

    booking.status = "cancelled"
    booking.cancel_reason = data.reason
    db.commit()
    return {"message": "Бронирование отменено", "id": booking.id}
