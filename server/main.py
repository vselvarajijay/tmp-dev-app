from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List
import uvicorn

# Import our database and models
from database import engine, get_db, Base
from server.models import TeamMember, RoleEnum
from server.schemas import TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse

# Create tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app instance
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint to retrieve all team members
@app.get("/team-members", response_model=List[TeamMemberResponse])
def get_all_team_members(db: Session = Depends(get_db)):
    members = db.query(TeamMember).all()
    return members

# Endpoint to retrieve a single team member by ID
@app.get("/team-members/{member_id}", response_model=TeamMemberResponse)
def get_team_member(member_id: int, db: Session = Depends(get_db)):
    member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if member is None:
        raise HTTPException(status_code=404, detail="Team member not found")
    return member

# Endpoint to create a new team member
@app.post("/team-members", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
def create_team_member(member: TeamMemberCreate, db: Session = Depends(get_db)):
    # Check if email or phone already exists
    existing_email = db.query(TeamMember).filter(TeamMember.email == member.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    existing_phone = db.query(TeamMember).filter(TeamMember.phone == member.phone).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Create new team member
    db_member = TeamMember(
        first_name=member.first_name,
        last_name=member.last_name,
        phone=member.phone,
        email=member.email,
        role=member.role
    )
    
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member

# Endpoint to update an existing team member
@app.put("/team-members/{member_id}", response_model=TeamMemberResponse)
def update_team_member(member_id: int, member: TeamMemberUpdate, db: Session = Depends(get_db)):
    db_member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if db_member is None:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    # Check if email or phone already exists (but for other members)
    existing_email = db.query(TeamMember).filter(
        TeamMember.email == member.email, 
        TeamMember.id != member_id
    ).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    existing_phone = db.query(TeamMember).filter(
        TeamMember.phone == member.phone, 
        TeamMember.id != member_id
    ).first()
    if existing_phone:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Update fields
    db_member.first_name = member.first_name
    db_member.last_name = member.last_name
    db_member.phone = member.phone
    db_member.email = member.email
    db_member.role = member.role
    
    db.commit()
    db.refresh(db_member)
    return db_member

# Endpoint to delete a team member
@app.delete("/team-members/{member_id}", status_code=status.HTTP_200_OK)
def delete_team_member(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if db_member is None:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    db.delete(db_member)
    db.commit()
    
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"detail": "Team member deleted successfully"}
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)