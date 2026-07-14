from typing import List
from fastapi import APIRouter, HTTPException

from backend.models.cpu import CPU
from backend.data.cpus import CPUS


router = APIRouter()

@router.get("/cpus", response_model=List[CPU])
def get_cpus(
    min_price: int | None = None,
    max_price: int | None = None
):
    result = []

    for cpu in CPUS:

        if min_price is not None and cpu.price < min_price:
            continue

        if max_price is not None and cpu.price > max_price:
            continue

        result.append(cpu)

    return result

@router.get("/cpus/{cpu_id}", response_model=CPU)
def get_cpu(cpu_id: int):
    for cpu in CPUS:
        if cpu.id == cpu_id:
            return cpu

    raise HTTPException(
        status_code=404,
        detail="CPU not found"
)

@router.post("/cpus", response_model=CPU)
def add_cpu(cpu: CPU):
    for existing_cpu in CPUS:
        if existing_cpu.id == cpu.id:
            raise HTTPException(
                status_code=400,
                detail="CPU ID already exists"
            )

    CPUS.append(cpu)
    return cpu

@router.delete("/cpus/{cpu_id}")
def delete_cpu(cpu_id: int):
    for cpu in CPUS:
        if cpu.id == cpu_id:
            CPUS.remove(cpu)
            return {"message": "CPU deleted successfully"}

    raise HTTPException(
        status_code=404,
        detail="CPU not found"
    )

@router.put("/cpus/{cpu_id}", response_model=CPU)
def update_cpu(cpu_id: int, updated_cpu: CPU):
    for i, cpu in enumerate(CPUS):
        if cpu.id == cpu_id:
            CPUS[i] = updated_cpu
            return updated_cpu

    raise HTTPException(
        status_code=404,
        detail="CPU not found"
    )