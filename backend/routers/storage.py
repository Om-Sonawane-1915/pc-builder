from typing import List
from fastapi import APIRouter, HTTPException

from backend.models.storage import Storage
from backend.data.storages import STORAGES

router = APIRouter()


@router.get("/storages", response_model=List[Storage])
def get_storages():
    return STORAGES


@router.get("/storages/{storage_id}", response_model=Storage)
def get_storage(storage_id: int):
    for storage in STORAGES:
        if storage.id == storage_id:
            return storage

    raise HTTPException(
        status_code=404,
        detail="Storage not found"
    )