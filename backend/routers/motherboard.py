from typing import List
from fastapi import APIRouter, HTTPException

from backend.models.motherboard import Motherboard
from backend.data.motherboards import MOTHERBOARDS

router = APIRouter()


@router.get("/motherboards", response_model=List[Motherboard])
def get_motherboards():
    return MOTHERBOARDS


@router.get("/motherboards/{motherboard_id}", response_model=Motherboard)
def get_motherboard(motherboard_id: int):
    for motherboard in MOTHERBOARDS:
        if motherboard.id == motherboard_id:
            return motherboard

    raise HTTPException(
        status_code=404,
        detail="Motherboard not found"
    )