from typing import List
from fastapi import APIRouter, HTTPException

from backend.models.cpu import CPU
from backend.data.cpus import CPUS


router = APIRouter()

@router.get("/cpus", response_model=List[CPU])
def get_cpus():
 return CPUS

@router.get("/cpus/{cpu_id}", response_model=CPU)
def get_cpu(cpu_id: int):
    for cpu in CPUS:
        if cpu.id == cpu_id:
            return cpu

    raise HTTPException(
    status_code=404,
    detail="CPU not found"
)