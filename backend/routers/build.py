from fastapi import APIRouter, HTTPException

from backend.data.cpus import CPUS
from backend.data.gpus import GPUS
from backend.data.motherboards import MOTHERBOARDS
from backend.data.rams import RAMS
from backend.data.storages import STORAGES
from backend.data.psus import PSUS

router = APIRouter()


@router.get("/build")
def build_pc(
    cpu_id: int,
    gpu_id: int,
    motherboard_id: int,
    ram_id: int,
    storage_id: int,
    psu_id: int
):
    cpu = next((c for c in CPUS if c.id == cpu_id), None)
    gpu = next((g for g in GPUS if g.id == gpu_id), None)
    motherboard = next((m for m in MOTHERBOARDS if m.id == motherboard_id), None)
    ram = next((r for r in RAMS if r.id == ram_id), None)
    storage = next((s for s in STORAGES if s.id == storage_id), None)
    psu = next((p for p in PSUS if p.id == psu_id), None)

    if cpu is None:
        raise HTTPException(status_code=404, detail="CPU not found")

    if gpu is None:
        raise HTTPException(status_code=404, detail="GPU not found")

    if motherboard is None:
        raise HTTPException(status_code=404, detail="Motherboard not found")

    if ram is None:
        raise HTTPException(status_code=404, detail="RAM not found")

    if storage is None:
        raise HTTPException(status_code=404, detail="Storage not found")

    if psu is None:
        raise HTTPException(status_code=404, detail="PSU not found")

    warnings = []

    if cpu.socket != motherboard.socket:
        warnings.append("CPU and Motherboard sockets do not match.")

    if motherboard.ram_type != ram.type:
        warnings.append("Motherboard does not support this RAM type.")

    required_power = cpu.power + gpu.power + 150

    if psu.wattage < required_power:
        warnings.append(
            f"PSU wattage too low. Required: {required_power}W"
        )

    total_price = (
        cpu.price +
        gpu.price +
        motherboard.price +
        ram.price +
        storage.price +
        psu.price
    )

    return {
        "compatible": len(warnings) == 0,
        "warnings": warnings,
        "required_power": required_power,
        "total_price": total_price,
        "build": {
            "cpu": cpu,
            "gpu": gpu,
            "motherboard": motherboard,
            "ram": ram,
            "storage": storage,
            "psu": psu
        }
    }