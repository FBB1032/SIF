from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Schema for creating a registration (Public site)
class RegistrationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    dept: str
    level: str
    attendance: str
    gender: Optional[str] = "Male"
    reason: Optional[str] = ""
    expectations: Optional[str] = ""

# Schema for creating/adding a registration from Admin Panel
class RegistrationAdminCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    dept: str
    level: str
    gender: str
    whatsapp: Optional[str] = "Not Added"
    reason: Optional[str] = "Registered via Admin console."
    expectations: Optional[str] = "Summit knowledge & networking."

# Schema for responding with registration details
class RegistrationResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    dept: str
    level: str
    attendance: str
    gender: Optional[str]
    whatsapp: str
    reason: Optional[str]
    expectations: Optional[str]
    reg_date: datetime

    class Config:
        from_attributes = True



# Schema for updating whatsapp status
class WhatsAppUpdate(BaseModel):
    whatsapp: str

# Schema for department statistics
class DeptStat(BaseModel):
    name: str
    percentage: int
    count: int
    color: str

# Schema for trend data
class TrendPoint(BaseModel):
    date: str
    count: int

# Schema for recent registrations
class RecentRegistration(BaseModel):
    name: str
    dept: str
    date: str
    time: str

# Schema for dashboard statistics
class DashboardStats(BaseModel):
    total_registrations: int
    male_registrations: int
    female_registrations: int
    added_to_whatsapp: int
    department_data: List[DeptStat]
    recent_registrations: List[RecentRegistration]
    trend_data: List[TrendPoint]
