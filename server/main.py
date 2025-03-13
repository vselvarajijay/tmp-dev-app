import os
import json
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
import uvicorn

DB_FILE = "db.json"

# Utility functions to read and write the JSON "database"
def load_db():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def write_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=2)

# Pydantic schemas adapted to the new fields
class TeamMemberCreate(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    role: str

class TeamMemberUpdate(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    role: str

class TeamMemberResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    phone: str
    email: str
    role: str

    class Config:
        orm_mode = True

# Create FastAPI app instance
app = FastAPI()

# Add CORS middleware to allow requests from your Vite app running at localhost:5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event to ensure the JSON file exists
@app.on_event("startup")
def on_startup():
    if not os.path.exists(DB_FILE):
        write_db([])

# Endpoint to retrieve all team members
@app.get("/team-members", response_model=List[TeamMemberResponse])
def get_all_team_members():
    members = load_db()
    return members

# Endpoint to retrieve a single team member by ID
@app.get("/team-members/{member_id}", response_model=TeamMemberResponse)
def get_team_member(member_id: int):
    members = load_db()
    for member in members:
        if member["id"] == member_id:
            return member
    raise HTTPException(status_code=404, detail="Team member not found")

# Endpoint to create a new team member
@app.post("/team-members", response_model=TeamMemberResponse, status_code=status.HTTP_201_CREATED)
def create_team_member(member: TeamMemberCreate):
    members = load_db()
    new_id = max([m["id"] for m in members], default=0) + 1
    new_member = {"id": new_id, **member.dict()}
    members.append(new_member)
    write_db(members)
    return new_member

# Endpoint to update an existing team member
@app.put("/team-members/{member_id}", response_model=TeamMemberResponse)
def update_team_member(member_id: int, member: TeamMemberUpdate):
    members = load_db()
    for idx, existing_member in enumerate(members):
        if existing_member["id"] == member_id:
            updated_member = {"id": member_id, **member.dict()}
            members[idx] = updated_member
            write_db(members)
            return updated_member
    raise HTTPException(status_code=404, detail="Team member not found")

# Endpoint to delete a team member
@app.delete("/team-members/{member_id}", status_code=status.HTTP_200_OK)
def delete_team_member(member_id: int):
    members = load_db()
    for idx, member in enumerate(members):
        if member["id"] == member_id:
            members.pop(idx)
            write_db(members)
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"detail": "Team member deleted successfully"}
            )
    raise HTTPException(status_code=404, detail="Team member not found")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
