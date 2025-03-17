from pydantic import BaseModel
from server.models import RoleEnum
from typing import Optional

# Pydantic schemas for request and response validation

class TeamMemberBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    role: RoleEnum

class TeamMemberCreate(TeamMemberBase):
    pass

class TeamMemberUpdate(TeamMemberBase):
    pass

class TeamMemberResponse(TeamMemberBase):
    id: int

    class Config:
        from_attributes = True  # For Pydantic v2