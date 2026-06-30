from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
import schemas
import auth
from database import get_db

router = APIRouter(prefix="/api", tags=["favorites"])


@router.post("/favorites/toggle", response_model=schemas.FavoriteResponse)
def toggle_favorite(
    favorite: schemas.FavoriteCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    existing_fav = db.query(models.Favorite).filter(
        models.Favorite.user_id == current_user.id,
        models.Favorite.venue_id == favorite.venue_id
    ).first()

    if existing_fav:
        db.delete(existing_fav)
        db.commit()
        return {"venue_id": favorite.venue_id, "message": "Удалено из избранного"}
    else:
        new_fav = models.Favorite(user_id=current_user.id, venue_id=favorite.venue_id)
        db.add(new_fav)
        db.commit()
        return {"venue_id": favorite.venue_id, "message": "Добавлено в избранное"}


@router.get("/favorites")
def get_user_favorites(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)
):
    favorites = db.query(models.Favorite).filter(models.Favorite.user_id == current_user.id).all()
    venue_ids = [fav.venue_id for fav in favorites]
    return venue_ids
