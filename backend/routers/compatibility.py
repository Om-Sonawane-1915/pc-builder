from fastapi import APIRouter, HTTPException

from backend.data.cpus import CPUS
from backend.data.motherboards import MOTHERBOARDS

router = APIRouter()


@router.get("/compatibility")
def check_compatibility(cpu_id: int, motherboard_id: int):
    cpu = next((c for c in CPUS if c.id == cpu_id), None)
    motherboard = next((m for m in MOTHERBOARDS if m.id == motherboard_id), None)

    if cpu is None:
        raise HTTPException(status_code=404, detail="CPU not found")

    if motherboard is None:
        raise HTTPException(status_code=404, detail="Motherboard not found")

    if cpu.socket == motherboard.socket:
        return {
            "compatible": True,
            "message": "CPU and Motherboard are compatible"
        }

    return {
        "compatible": False,
        "message": "Socket mismatch"
    }