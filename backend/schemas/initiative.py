from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Epic Schemas
class EpicBase(BaseModel):
    name: str
    description: Optional[str] = None
    effort_level: Optional[str] = None
    resource: Optional[str] = None
    status: Optional[str] = "Pending"
    order_index: int = 0

class EpicCreate(EpicBase):
    initiative_id: str

class EpicUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    effort_level: Optional[str] = None
    resource: Optional[str] = None
    status: Optional[str] = None
    order_index: Optional[int] = None

class EpicResponse(EpicBase):
    id: str
    initiative_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Initiative Schemas
class InitiativeBase(BaseModel):
    op1: str
    op2: str
    team: str
    op3: str
    platform: Optional[str] = None
    initiatives: str
    c: Optional[str] = None
    effort_level: Optional[str] = None
    resource: Optional[str] = None
    impact: Optional[str] = None
    priority: Optional[str] = None
    comments: Optional[str] = None
    order_index: int = 0

class InitiativeCreate(InitiativeBase):
    pass

class InitiativeUpdate(BaseModel):
    op1: Optional[str] = None
    op2: Optional[str] = None
    team: Optional[str] = None
    op3: Optional[str] = None
    platform: Optional[str] = None
    initiatives: Optional[str] = None
    c: Optional[str] = None
    effort_level: Optional[str] = None
    resource: Optional[str] = None
    impact: Optional[str] = None
    priority: Optional[str] = None
    comments: Optional[str] = None
    order_index: Optional[int] = None

class InitiativeResponse(InitiativeBase):
    id: str
    created_at: datetime
    updated_at: datetime
    epics: List[EpicResponse] = []

    class Config:
        from_attributes = True
