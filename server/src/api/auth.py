from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from ..models.models import User
from ..config.database import db_dependency
from ..utils.security import (
    authenticate_user,
    create_access_token,
    hash_password,
    jwt_dependency,
)

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user: User, db: db_dependency):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists.",
        )
    UserModel = User(
        name=user.name, email=user.email, password=hash_password(user.password)
    )
    db.add(UserModel)
    db.commit()
    db.refresh(UserModel)
    access_token = create_access_token(UserModel.id, timedelta(days=30))
    del UserModel.password
    return {
        "success": True,
        "user": UserModel,
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency
):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )
    else:
        access_token = create_access_token(user.id, timedelta(days=30))
        del user.password
        return {
            "success": True,
            "user": user,
            "access_token": access_token,
            "token_type": "bearer",
        }


@router.get("/me")
async def get_current_user(db: db_dependency, payload: jwt_dependency):
    user = db.get(User, payload["id"])
    del user.password
    return {"success": True, "data": user}
