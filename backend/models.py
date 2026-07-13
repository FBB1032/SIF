from sqlalchemy import Column, Integer, String, Text, DateTime, func
from database import Base

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    phone = Column(String(100), nullable=False)
    dept = Column(String(255), nullable=False)
    level = Column(String(100), nullable=False)
    attendance = Column(String(100), nullable=False) # In-Person or Online
    gender = Column(String(100), nullable=True, default="Male")
    whatsapp = Column(String(100), nullable=False, default="Not Added") # Added, Not Added, Not Active
    reason = Column(Text, nullable=True)
    expectations = Column(Text, nullable=True)
    reg_date = Column(DateTime(timezone=True), server_default=func.now())
