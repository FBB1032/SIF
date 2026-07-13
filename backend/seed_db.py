import os
import sys
from datetime import datetime, timedelta

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from dotenv import load_dotenv
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
dotenv_path = os.path.join(BASE_DIR, ".env")
load_dotenv(dotenv_path, override=True)

from database import engine, SessionLocal, Base
import models

# Create tables
print("Creating registrations table in Supabase...")
Base.metadata.create_all(bind=engine)
print("Table created successfully.")

db = SessionLocal()

# Check if registrations table has records
existing_count = db.query(models.Registration).count()
if existing_count > 0:
    print(f"Database already has {existing_count} records. Skipping seeding.")
    db.close()
    sys.exit(0)

print("Seeding database...")

mock_registrations = [
    {
        "name": "Abdullahi Ibrahim",
        "email": "abdullahi.ibrahim@abu.edu.ng",
        "phone": "+234 801 234 5678",
        "dept": "Computer Engineering",
        "level": "300 Level",
        "status": "Approved",
        "whatsapp": "Added",
        "gender": "Male",
        "reason": "To gain knowledge, network, and contribute to meaningful discussions.",
        "expectations": "To learn from experts and interact with like-minded students.",
        "days_ago": 0
    },
    {
        "name": "Fatima Bello",
        "email": "fatima.bello@abu.edu.ng",
        "phone": "+234 802 345 6789",
        "dept": "Electrical Eng.",
        "level": "400 Level",
        "status": "Approved",
        "whatsapp": "Not Added",
        "gender": "Female",
        "reason": "To build leadership skills and contribute to youth policy frameworks.",
        "expectations": "Networking opportunities and high-impact discussions.",
        "days_ago": 1
    },
    {
        "name": "Usman Khalid",
        "email": "usman.khalid@abu.edu.ng",
        "phone": "+234 803 456 7890",
        "dept": "Mechanical Eng.",
        "level": "200 Level",
        "status": "Approved",
        "whatsapp": "Added",
        "gender": "Male",
        "reason": "To learn about innovative engineering practices.",
        "expectations": "Skill acquisition.",
        "days_ago": 2
    },
    {
        "name": "Zainab Lawal",
        "email": "zainab.lawal@abu.edu.ng",
        "phone": "+234 804 567 8901",
        "dept": "Chemical Eng.",
        "level": "100 Level",
        "status": "Pending",
        "whatsapp": "Not Added",
        "gender": "Female",
        "reason": "Interested in chemical research debates.",
        "expectations": "Interactive panels.",
        "days_ago": 2
    },
    {
        "name": "Ahmed Musa",
        "email": "ahmed.musa@abu.edu.ng",
        "phone": "+234 805 678 9012",
        "dept": "Civil Eng.",
        "level": "300 Level",
        "status": "Approved",
        "whatsapp": "Added",
        "gender": "Male",
        "reason": "To expand network.",
        "expectations": "Panel insights.",
        "days_ago": 3
    },
    {
        "name": "Maryam Sani",
        "email": "maryam.sani@abu.edu.ng",
        "phone": "+234 806 789 0123",
        "dept": "Software Eng.",
        "level": "400 Level",
        "status": "Pending",
        "whatsapp": "Not Active",
        "gender": "Female",
        "reason": "Software development focus.",
        "expectations": "Practical workshops.",
        "days_ago": 3
    },
    {
        "name": "Haruna Abdullahi",
        "email": "haruna.abdullahi@abu.edu.ng",
        "phone": "+234 807 890 1234",
        "dept": "Physics",
        "level": "200 Level",
        "status": "Approved",
        "whatsapp": "Added",
        "gender": "Male",
        "reason": "Interested in educational reforms.",
        "expectations": "Learn from mentors.",
        "days_ago": 4
    },
    {
        "name": "Aisha Muhammad",
        "email": "aisha.muhammad@abu.edu.ng",
        "phone": "+234 808 901 2345",
        "dept": "Architecture",
        "level": "400 Level",
        "status": "Approved",
        "whatsapp": "Not Added",
        "gender": "Female",
        "reason": "Architectural planning for campus.",
        "expectations": "Networking.",
        "days_ago": 4
    }
]

# We will spread the registration dates slightly to form a nice graph line trend
base_time = datetime.now()

for item in mock_registrations:
    reg_time = base_time - timedelta(days=item["days_ago"])
    reg = models.Registration(
        name=item["name"],
        email=item["email"],
        phone=item["phone"],
        dept=item["dept"],
        level=item["level"],
        attendance="In-Person",
        gender=item["gender"],
        status=item["status"],
        whatsapp=item["whatsapp"],
        reason=item["reason"],
        expectations=item["expectations"],
        reg_date=reg_time
    )
    db.add(reg)

db.commit()
db.close()
print("Database successfully seeded with registrations data!")
