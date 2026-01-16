from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db
from database.models import Initiative, Epic
from schemas.initiative import InitiativeCreate, InitiativeUpdate, InitiativeResponse, EpicCreate, EpicUpdate, EpicResponse
from typing import List

router = APIRouter(prefix="/api/initiatives", tags=["initiatives"])

@router.get("/", response_model=List[InitiativeResponse])
def get_all_initiatives(db: Session = Depends(get_db)):
    from sqlalchemy.orm import joinedload
    return db.query(Initiative).options(joinedload(Initiative.epics)).order_by(Initiative.order_index).all()

@router.post("/", response_model=InitiativeResponse, status_code=201)
def create_initiative(initiative: InitiativeCreate, db: Session = Depends(get_db)):
    db_initiative = Initiative(**initiative.dict())
    db.add(db_initiative)
    db.commit()
    db.refresh(db_initiative)
    return db_initiative

@router.put("/{initiative_id}", response_model=InitiativeResponse)
def update_initiative(initiative_id: str, initiative: InitiativeUpdate, db: Session = Depends(get_db)):
    db_initiative = db.query(Initiative).filter(Initiative.id == initiative_id).first()
    if not db_initiative:
        raise HTTPException(status_code=404, detail="Initiative not found")

    for key, value in initiative.dict(exclude_unset=True).items():
        setattr(db_initiative, key, value)

    db.commit()
    db.refresh(db_initiative)
    return db_initiative

@router.delete("/{initiative_id}", status_code=204)
def delete_initiative(initiative_id: str, db: Session = Depends(get_db)):
    db_initiative = db.query(Initiative).filter(Initiative.id == initiative_id).first()
    if not db_initiative:
        raise HTTPException(status_code=404, detail="Initiative not found")

    db.delete(db_initiative)
    db.commit()
    return None

@router.patch("/reorder", status_code=200)
def reorder_initiatives(order: List[dict], db: Session = Depends(get_db)):
    # order = [{"id": "uuid1", "order_index": 0}, ...]
    for item in order:
        db.query(Initiative).filter(Initiative.id == item["id"]).update({"order_index": item["order_index"]})
    db.commit()
    return {"message": "Order updated"}

# Epic endpoints
@router.post("/{initiative_id}/epics", response_model=EpicResponse, status_code=201)
def create_epic(initiative_id: str, epic: EpicCreate, db: Session = Depends(get_db)):
    # Verify initiative exists
    db_initiative = db.query(Initiative).filter(Initiative.id == initiative_id).first()
    if not db_initiative:
        raise HTTPException(status_code=404, detail="Initiative not found")

    # Create epic
    epic_data = epic.dict()
    epic_data["initiative_id"] = initiative_id
    db_epic = Epic(**epic_data)
    db.add(db_epic)
    db.commit()
    db.refresh(db_epic)
    return db_epic

@router.get("/{initiative_id}/epics", response_model=List[EpicResponse])
def get_initiative_epics(initiative_id: str, db: Session = Depends(get_db)):
    return db.query(Epic).filter(Epic.initiative_id == initiative_id).order_by(Epic.order_index).all()

@router.put("/epics/{epic_id}", response_model=EpicResponse)
def update_epic(epic_id: str, epic: EpicUpdate, db: Session = Depends(get_db)):
    db_epic = db.query(Epic).filter(Epic.id == epic_id).first()
    if not db_epic:
        raise HTTPException(status_code=404, detail="Epic not found")

    for key, value in epic.dict(exclude_unset=True).items():
        setattr(db_epic, key, value)

    db.commit()
    db.refresh(db_epic)
    return db_epic

@router.delete("/epics/{epic_id}", status_code=204)
def delete_epic(epic_id: str, db: Session = Depends(get_db)):
    db_epic = db.query(Epic).filter(Epic.id == epic_id).first()
    if not db_epic:
        raise HTTPException(status_code=404, detail="Epic not found")

    db.delete(db_epic)
    db.commit()
    return None

@router.patch("/epics/reorder", status_code=200)
def reorder_epics(order: List[dict], db: Session = Depends(get_db)):
    # order = [{"id": "epic_uuid1", "order_index": 0}, ...]
    for item in order:
        db.query(Epic).filter(Epic.id == item["id"]).update({"order_index": item["order_index"]})
    db.commit()
    return {"message": "Epic order updated"}
