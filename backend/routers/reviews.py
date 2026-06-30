import json
import base64
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session, joinedload

import models
import schemas
import auth
from database import get_db

router = APIRouter(prefix="/api", tags=["reviews"])


@router.post("/reviews", response_model=schemas.ReviewResponse)
def create_review(
    review: schemas.ReviewCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    existing = db.query(models.Review).filter(
        models.Review.user_id == current_user.id,
        models.Review.venue_id == review.venue_id,
        models.Review.branch_id == review.branch_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Вы уже оставляли отзыв на этот адрес")

    new_review = models.Review(
        rating=review.rating,
        text=review.text,
        venue_id=review.venue_id,
        branch_id=review.branch_id,
        user_id=current_user.id
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return schemas.ReviewResponse(
        id=new_review.id,
        rating=new_review.rating,
        text=new_review.text,
        photos=None,
        venue_id=new_review.venue_id,
        branch_id=new_review.branch_id,
        created_at=str(new_review.created_at),
        user_name=current_user.name,
        user_avatar=current_user.avatar,
        user_id=current_user.id
    )


@router.post("/reviews/photos")
async def upload_review_photos(
    review_id: int = None,
    files: list[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if len(files) > 3:
        raise HTTPException(status_code=400, detail="Максимум 3 фотографии")

    photos = []
    for file in files:
        if file.content_type not in ["image/jpeg", "image/png", "image/webp", "image/gif"]:
            raise HTTPException(status_code=400, detail="Допустимые форматы: JPEG, PNG, WebP, GIF")
        contents = await file.read()
        if len(contents) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Максимальный размер файла — 5 МБ")
        b64 = base64.b64encode(contents).decode("utf-8")
        photos.append(f"data:{file.content_type};base64,{b64}")

    if review_id is not None:
        review = db.query(models.Review).filter(
            models.Review.id == review_id,
            models.Review.user_id == current_user.id
        ).first()
        if review:
            review.photos = json.dumps(photos)
            db.commit()

    return {"photos": photos}


@router.get("/reviews/my", response_model=list[schemas.ReviewResponse])
def get_my_reviews(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    reviews = db.query(models.Review).options(joinedload(models.Review.user)).filter(
        models.Review.user_id == current_user.id
    ).order_by(models.Review.created_at.desc()).all()

    result = []
    for r in reviews:
        user = r.user
        photos = json.loads(r.photos) if r.photos else None
        result.append(schemas.ReviewResponse(
            id=r.id,
            rating=r.rating,
            text=r.text,
            photos=photos,
            venue_id=r.venue_id,
            branch_id=r.branch_id,
            created_at=str(r.created_at),
            user_name=user.name if user else "Удалённый пользователь",
            user_avatar=user.avatar if user else None,
            user_id=r.user_id
        ))
    return result


@router.get("/reviews/{venue_id}", response_model=list[schemas.ReviewResponse])
def get_venue_reviews(
    venue_id: str,
    page: int = 1,
    per_page: int = 20,
    db: Session = Depends(get_db)
):
    query = db.query(models.Review).options(joinedload(models.Review.user)).filter(models.Review.venue_id == venue_id)
    total = query.count()
    reviews = query.order_by(models.Review.created_at.desc()).offset((page - 1) * per_page).limit(per_page).all()

    result = []
    for r in reviews:
        user = r.user
        photos = json.loads(r.photos) if r.photos else None
        result.append(schemas.ReviewResponse(
            id=r.id,
            rating=r.rating,
            text=r.text,
            photos=photos,
            venue_id=r.venue_id,
            branch_id=r.branch_id,
            created_at=str(r.created_at),
            user_name=user.name if user else "Удалённый пользователь",
            user_avatar=user.avatar if user else None,
            user_id=r.user_id
        ))
    return result


@router.delete("/reviews/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    review = db.query(models.Review).filter(
        models.Review.id == review_id,
        models.Review.user_id == current_user.id
    ).first()
    if not review:
        raise HTTPException(status_code=404, detail="Отзыв не найден")
    db.delete(review)
    db.commit()
    return {"message": "Отзыв удален"}
