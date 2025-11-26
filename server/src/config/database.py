import os
from typing import Annotated
from fastapi import Depends
from sqlmodel import create_engine, SQLModel, Session
from ..models import models

DATABASE_URL = os.environ["DATABASE_URL"]

engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        try:
            yield session
        finally:
            session.close()


db_dependency = Annotated[Session, Depends(get_session)]
