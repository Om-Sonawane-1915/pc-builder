from typing import List
from fastapi import APIRouter, HTTPException

from backend.models.ram import RAM
from backend.data.rams import RAMS

router = APIRouter()


@router.get("/rams", response_model=List[RAM])
def get_rams():
    return RAMS


@router.get("/rams/{ram_id}", response_model=RAM)
def get_ram(ram_id: int):
    for ram in RAMS:
        if ram.id == ram_id:
            return ram

    raise HTTPException(
        status_code=404,
        detail="RAM not found"
    )