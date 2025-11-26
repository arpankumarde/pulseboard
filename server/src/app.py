from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from .api import ping, auth, subscription
from .config.database import init_db
from .lib import pg


load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


# from src.lib import pg

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ping.router)
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(
    subscription.router, prefix="/api/v1/subscription", tags=["subscription"]
)
