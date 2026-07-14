from typing import List
from fastapi import APIRouter, HTTPException

from backend.models.psu import PSU
from backend.data.psus import PSUS

router = APIRouter()


@router.get("/psus", response_model=List[PSU])
def get_psus():
    return PSUS


@router.get("/psus/{psu_id}", response_model=PSU)
def get_psu(psu_id: int):
    for psu in PSUS:
        if psu.id == psu_id:
            return psu

    raise HTTPException(
        status_code=404,
        detail="PSU not found"
    )