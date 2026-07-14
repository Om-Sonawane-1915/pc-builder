from fastapi import APIRouter, HTTPException

from backend.data.cpus import CPUS
from backend.data.motherboards import MOTHERBOARDS
from backend.data.rams import RAMS
from backend.data.gpus import GPUS
from backend.data.psus import PSUS

router = APIRouter()


@router.get("/compatibility")
def check_compatibility(
    cpu_id: int,
    motherboard_id: int,
    ram_id: int,
    gpu_id: int,
    psu_id: int
):
    cpu = next((c for c in CPUS if c.id == cpu_id), None)
    motherboard = next((m for m in MOTHERBOARDS if m.id == motherboard_id), None)
    ram = next((r for r in RAMS if r.id == ram_id), None)
    gpu = next((g for g in GPUS if g.id == gpu_id), None)
    psu = next((p for p in PSUS if p.id == psu_id), None)

    if cpu is None:
        raise HTTPException(status_code=404, detail="CPU not found")

    if motherboard is None:
        raise HTTPException(status_code=404, detail="Motherboard not found")

    if ram is None:
        raise HTTPException(status_code=404, detail="RAM not found")

    if gpu is None:
        raise HTTPException(status_code=404, detail="GPU not found")

    if psu is None:
        raise HTTPException(status_code=404, detail="PSU not found")

    if cpu.socket != motherboard.socket:
        return {
            "compatible": False,
            "message": "CPU and motherboard socket mismatch"
        }

    if motherboard.ram_type != ram.type:
        return {
            "compatible": False,
            "message": "Motherboard and RAM type mismatch"
        }

    required_power = cpu.power + gpu.power + 150

    if psu.wattage < required_power:
        return {
            "compatible": False,
            "message": f"PSU too weak. Required: {required_power}W"
        }

    return {
        "compatible": True,
        "message": "All selected components are compatible",
        "required_power": required_power
    }