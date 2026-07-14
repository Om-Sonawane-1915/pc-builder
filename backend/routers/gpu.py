from typing import List
from fastapi import APIRouter, HTTPException

from backend.models.gpu import GPU
from backend.data.gpus import GPUS

router = APIRouter()


@router.get("/gpus", response_model=List[GPU])
def get_gpus():
    return GPUS

@router.get("/gpus/{gpu_id}", response_model=GPU)
def get_gpu(gpu_id: int):
    for gpu in GPUS:
        if gpu.id == gpu_id:
            return gpu

    raise HTTPException(
        status_code=404,
        detail="GPU not found"
    )