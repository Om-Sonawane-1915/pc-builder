from typing import List
from fastapi import APIRouter

from backend.models.cpu import CPU
from backend.data.cpus import CPUS


router = APIRouter()

@router.get("/cpus", response_model=List[CPU])
def get_cpus():
 return CPUS