from typing import List
from fastapi import APIRouter

from backend.models.gpu import GPU
from backend.data.gpus import GPUS

router = APIRouter()


@router.get("/gpus", response_model=List[GPU])
def get_gpus():
    return GPUS