from sqlalchemy import Column, String, Integer, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

Base = declarative_base()

class Initiative(Base):
    __tablename__ = "initiatives"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    op1 = Column(String(255), nullable=False)
    op2 = Column(String(255), nullable=False)
    team = Column(String(100), nullable=False)
    op3 = Column(String(255), nullable=False)
    platform = Column(String(255))
    initiatives = Column(Text, nullable=False)
    c = Column(String(10))
    effort_level = Column(String(50))
    resource = Column(String(100))
    impact = Column(String(50))
    priority = Column(String(50))
    comments = Column(Text)
    order_index = Column(Integer, default=0)  # Para drag & drop
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    epics = relationship("Epic", back_populates="initiative", cascade="all, delete-orphan")

class Epic(Base):
    __tablename__ = "epics"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    initiative_id = Column(String(36), ForeignKey("initiatives.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    effort_level = Column(String(50))
    resource = Column(String(100))
    status = Column(String(50), default="Pending")
    order_index = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship
    initiative = relationship("Initiative", back_populates="epics")
