from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime
from typing import Optional
import uuid


class User(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    email: str = Field(index=True, unique=True)
    phone: Optional[str] = Field(default=None)
    name: Optional[str] = None
    password: str = Field()
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    subscription: Optional["Subscription"] = Relationship(back_populates="user")
    payments: list["Payment"] = Relationship(back_populates="user")


class Plan(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    plan_name: str
    item_id: str
    price: int
    plan_code: str = Field(index=True, unique=True)
    subscriptions: list["Subscription"] = Relationship(back_populates="plan")


class Subscription(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id", unique=True, ondelete="CASCADE")
    plan_id: str = Field(foreign_key="plan.id")
    pg_subscription_id: Optional[str] = Field(default=None, unique=True, index=True)
    status: str = Field(default="created")
    current_period_start: Optional[datetime] = None
    current_period_end: Optional[datetime] = None
    total_count: Optional[int] = None
    paid_count: int = Field(default=0)
    started_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    user: User = Relationship(back_populates="subscription")
    plan: Plan = Relationship(back_populates="subscriptions")


class Payment(SQLModel, table=True):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="user.id", index=True, ondelete="CASCADE")
    pg_payment_id: str = Field(unique=True, index=True)
    pg_order_id: Optional[str] = None
    pg_subscription_id: Optional[str] = Field(default=None, index=True)
    pg_signature: str
    amount: int
    currency: str = Field(default="INR")
    status: str
    method: Optional[str] = None
    pg_invoice_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    user: User = Relationship(back_populates="payments")


# Subscription Status: created, authenticated, active, pending, halted, cancelled, completed
# Payment Status: captured, failed, refunded
