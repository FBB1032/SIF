import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import datetime

import models
import schemas
from database import engine, get_db, Base

# Attempt to create database tables
try:
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully.")
except Exception as e:
    print(f"Error creating database tables: {e}")
    print("Please make sure your PostgreSQL database exists and the connection URL in .env is correct.")

app = FastAPI(title="SIF Summit 2.0 Backend", version="1.0.0")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://sif-five.vercel.app",
        "https://sif-admin-psi.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    import traceback
    traceback.print_exc()
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal Server Error", "error": str(exc)},
    )

@app.get("/api/debug")
def debug_db(db: Session = Depends(get_db)):
    import traceback
    from database import DATABASE_URL
    try:
        from sqlalchemy import text
        result = db.execute(text("SELECT 1")).scalar()
        
        # Mask password in URL for display
        db_url = DATABASE_URL
        if "@" in db_url:
            parts = db_url.split("@")
            prefix = parts[0]
            if ":" in prefix:
                sub_parts = prefix.split(":")
                # Safe parse protocol and username
                prefix = f"{sub_parts[0]}://{sub_parts[1].split('//')[-1]}:*****"
            db_url = f"{prefix}@{parts[1]}"
            
        return {
            "status": "connected",
            "select_1": result,
            "database_url": db_url
        }
    except Exception as e:
        return {
            "status": "failed",
            "error": str(e),
            "traceback": traceback.format_exc()
        }

# Endpoint for public user registration
@app.post("/api/register", response_model=schemas.RegistrationResponse, status_code=status.HTTP_201_CREATED)
def register_user(registration: schemas.RegistrationCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing = db.query(models.Registration).filter(models.Registration.email == registration.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email address is already registered for the Summit."
        )
    
    db_reg = models.Registration(
        name=registration.name,
        email=registration.email,
        phone=registration.phone,
        dept=registration.dept,
        level=registration.level,
        attendance=registration.attendance,
        gender=registration.gender,
        reason=registration.reason if registration.reason else "Registered via web portal.",
        expectations=registration.expectations if registration.expectations else "Summit knowledge & networking.",
        whatsapp="Not Added"
    )
    
    db.add(db_reg)
    db.commit()
    db.refresh(db_reg)
    return db_reg

# Endpoint for admin to retrieve all registrations
@app.get("/api/registrations", response_model=List[schemas.RegistrationResponse])
def get_registrations(db: Session = Depends(get_db)):
    return db.query(models.Registration).order_by(models.Registration.reg_date.desc()).all()

# Endpoint for admin to manually add an attendee
@app.post("/api/registrations", response_model=schemas.RegistrationResponse, status_code=status.HTTP_201_CREATED)
def admin_add_registration(registration: schemas.RegistrationAdminCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Registration).filter(models.Registration.email == registration.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Attendee with this email already exists."
        )
    
    db_reg = models.Registration(
        name=registration.name,
        email=registration.email,
        phone=registration.phone,
        dept=registration.dept,
        level=registration.level,
        attendance="In-Person",  # Admin added defaults to In-Person
        gender=registration.gender,
        whatsapp=registration.whatsapp,
        reason=registration.reason,
        expectations=registration.expectations
    )
    
    db.add(db_reg)
    db.commit()
    db.refresh(db_reg)
    return db_reg



# Endpoint for updating whatsapp status
@app.put("/api/registrations/{reg_id}/whatsapp", response_model=schemas.RegistrationResponse)
def update_whatsapp(reg_id: int, whatsapp_update: schemas.WhatsAppUpdate, db: Session = Depends(get_db)):
    db_reg = db.query(models.Registration).filter(models.Registration.id == reg_id).first()
    if not db_reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    db_reg.whatsapp = whatsapp_update.whatsapp
    db.commit()
    db.refresh(db_reg)
    return db_reg

# Endpoint for deleting an attendee registration
@app.delete("/api/registrations/{reg_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_registration(reg_id: int, db: Session = Depends(get_db)):
    db_reg = db.query(models.Registration).filter(models.Registration.id == reg_id).first()
    if not db_reg:
        raise HTTPException(status_code=404, detail="Registration not found")
    
    db.delete(db_reg)
    db.commit()
    return None

# Endpoint for retrieving dashboard stats in real-time
@app.get("/api/dashboard/stats", response_model=schemas.DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    registrations = db.query(models.Registration).all()
    total = len(registrations)
    
    male_regs = sum(1 for r in registrations if r.gender == "Male")
    female_regs = sum(1 for r in registrations if r.gender == "Female")
    whatsapp_added = sum(1 for r in registrations if r.whatsapp == "Added")
    
    # Compute department statistics
    dept_counts = {}
    for r in registrations:
        dept_counts[r.dept] = dept_counts.get(r.dept, 0) + 1
        
    sorted_depts = sorted(dept_counts.items(), key=lambda x: x[1], reverse=True)
    
    # Predefined background colors for department bars matching UI
    colors = ['bg-green-600', 'bg-blue-600', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500']
    dept_data = []
    
    for idx, (dept_name, count) in enumerate(sorted_depts):
        pct = (count * 100) // total if total > 0 else 0
        color = colors[idx] if idx < len(colors) else 'bg-gray-400'
        dept_data.append({
            "name": dept_name,
            "percentage": pct,
            "count": count,
            "color": color
        })
        
    # Group remaining departments into 'Others' if there are more than 5
    if len(dept_data) > 5:
        top_5 = dept_data[:5]
        others_count = sum(d["count"] for d in dept_data[5:])
        others_pct = (others_count * 100) // total if total > 0 else 0
        top_5.append({
            "name": "Others",
            "percentage": others_pct,
            "count": others_count,
            "color": "bg-gray-400"
        })
        dept_data = top_5

    # Recent registrations (last 4 records)
    recent_records = sorted(registrations, key=lambda x: x.reg_date or datetime.datetime.min, reverse=True)[:4]
    recent_list = []
    for r in recent_records:
        recent_list.append({
            "name": r.name,
            "dept": r.dept,
            "date": r.reg_date.strftime("%b %d, %Y") if r.reg_date else "",
            "time": r.reg_date.strftime("%I:%M %p") if r.reg_date else ""
        })

    # Trend data (registrations grouped by day, sorted chronologically)
    trend_dict = {}
    for r in registrations:
        if r.reg_date:
            date_str = r.reg_date.strftime("%b %d")
            trend_dict[date_str] = trend_dict.get(date_str, 0) + 1
            
    unique_dates_sorted = sorted(list(set(r.reg_date.date() for r in registrations if r.reg_date)))
    trend_data = []
    for d in unique_dates_sorted:
        d_str = d.strftime("%b %d")
        trend_data.append({
            "date": d_str,
            "count": trend_dict.get(d_str, 0)
        })
        
    # fallback to generate recent 5 days trend data with count 0 if no records exist (to avoid breaking UI graphs)
    if not trend_data:
        today = datetime.date.today()
        for i in range(4, -1, -1):
            day = today - datetime.timedelta(days=i)
            trend_data.append({
                "date": day.strftime("%b %d"),
                "count": 0
            })
            
    return {
        "total_registrations": total,
        "male_registrations": male_regs,
        "female_registrations": female_regs,
        "added_to_whatsapp": whatsapp_added,
        "department_data": dept_data,
        "recent_registrations": recent_list,
        "trend_data": trend_data
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
