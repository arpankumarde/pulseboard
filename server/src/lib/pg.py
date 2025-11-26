import os
import razorpay
from sqlmodel import select
from ..config.database import get_session, db_dependency
from ..models.models import Plan

pg = razorpay.Client(auth=(os.environ["PG_KEY_ID"], os.environ["PG_KEY_SECRET"]))


def sync_plans(db: db_dependency):
    plans = pg.plan.all()
    for plan in plans["items"]:
        if db.exec(select(Plan).where(Plan.id == plan["id"])).first():
            continue

        if isinstance(plan["notes"], list):
            continue

        db_plan = Plan(
            id=plan["id"],
            plan_name=plan["item"]["name"],
            item_id=plan["item"]["id"],
            price=plan["item"]["amount"],
            plan_code=plan["notes"]["plan_code"],
        )
        db.add(db_plan)
    db.commit()


if __name__ == "__main__":
    sync_plans(db=next(get_session()))
