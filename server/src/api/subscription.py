from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from sqlmodel import select
from ..lib.pg import pg
from ..models.models import Plan, Subscription, User
from ..config.database import db_dependency
from ..utils.security import jwt_dependency

router = APIRouter()


class SubVerifyForm(BaseModel):
    subscription_id: str
    payment_id: str
    signature: str


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_subscription(db: db_dependency, payload: jwt_dependency):
    existing_subscription = db.exec(
        select(Subscription).where(Subscription.user_id == payload["id"])
    ).first()

    PRO_PLAN = db.exec(select(Plan).where(Plan.plan_code == "PRO")).first()

    # Handle existing subscriptions
    if existing_subscription:
        if existing_subscription.status == "created":
            return {"success": True, "data": existing_subscription.pg_subscription_id}

        if existing_subscription.status in ["active", "authenticated"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You already have an active subscription.",
            )

        if existing_subscription.status in ["cancelled", "completed"]:
            sub = pg.subscription.create(
                {
                    "plan_id": PRO_PLAN.id,
                    "total_count": 360,
                    "notes": {"plan_code": PRO_PLAN.plan_code},
                }
            )

            existing_subscription.pg_subscription_id = sub["id"]
            existing_subscription.status = "created"
            existing_subscription.cancelled_at = None
            db.add(existing_subscription)
            db.commit()
            db.refresh(existing_subscription)
            return {"success": True, "data": existing_subscription.pg_subscription_id}

    # Create new subscription
    sub = pg.subscription.create(
        {
            "plan_id": PRO_PLAN.id,
            "total_count": 360,
            "notes": {"plan_code": PRO_PLAN.plan_code},
        }
    )

    new_subscription = Subscription(
        user_id=payload["id"],
        plan_id=PRO_PLAN.id,
        pg_subscription_id=sub["id"],
        status="created",
    )
    db.add(new_subscription)
    db.commit()
    db.refresh(new_subscription)
    return {"success": True, "data": new_subscription.pg_subscription_id}


@router.post("/verify")
async def verify_subscription(
    req: SubVerifyForm, db: db_dependency, payload: jwt_dependency
):
    pass


@router.get("/status")
async def subscription_status(db: db_dependency, payload: jwt_dependency):
    row = db.exec(
        select(User, Subscription)
        .join(Subscription, Subscription.user_id == User.id, isouter=True)
        .where(User.id == payload["id"])
    ).first()
    if not row:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    user, subscription = row
    user.subscription = subscription
    del user.password
    return {"success": True, "data": {"user": user, "subscription": subscription}}
