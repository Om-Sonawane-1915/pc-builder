from fastapi import APIRouter

from backend.data.cpus import CPUS
from backend.data.gpus import GPUS
from backend.data.motherboards import MOTHERBOARDS
from backend.data.rams import RAMS
from backend.data.storages import STORAGES
from backend.data.psus import PSUS

router = APIRouter()


@router.get("/generate")
def generate_build(
    budget: int,
    purpose: str = "Gaming"
):

    # -------------------------
    # GPU
    # -------------------------

    sorted_gpus = sorted(
        GPUS,
        key=lambda gpu: gpu.performance_score,
        reverse=True
    )

    selected_gpu = None

    for gpu in sorted_gpus:
        if gpu.price <= budget * 0.50:
            selected_gpu = gpu
            break

    if selected_gpu is None:
        selected_gpu = sorted(GPUS, key=lambda g: g.price)[0]

    # -------------------------
    # CPU
    # -------------------------

    sorted_cpus = sorted(
        CPUS,
        key=lambda cpu: cpu.gaming_score,
        reverse=True
    )

    selected_cpu = None

    for cpu in sorted_cpus:
        if cpu.price <= budget * 0.25:
            selected_cpu = cpu
            break

    if selected_cpu is None:
        selected_cpu = sorted(CPUS, key=lambda c: c.price)[0]

    # -------------------------
    # Motherboard
    # -------------------------

    selected_motherboard = None

    for motherboard in MOTHERBOARDS:
        if motherboard.socket == selected_cpu.socket:
            selected_motherboard = motherboard
            break

    # -------------------------
    # RAM
    # -------------------------

    selected_ram = None

    for ram in RAMS:
        if ram.type == selected_motherboard.ram_type:
            selected_ram = ram
            break

    # -------------------------
    # Storage
    # -------------------------

    selected_storage = STORAGES[0]

    # -------------------------
    # PSU
    # -------------------------

    required_power = (
        selected_cpu.power +
        selected_gpu.power +
        150
    )

    sorted_psus = sorted(
        PSUS,
        key=lambda p: (p.wattage, p.price)
    )

    selected_psu = None

    if budget >= 150000:
        preferred_headroom = 250
    elif budget >= 100000:
        preferred_headroom = 150
    else:
        preferred_headroom = 100

    for psu in sorted_psus:
        if psu.wattage >= required_power + preferred_headroom:
            selected_psu = psu
            break

    if selected_psu is None:
        for psu in sorted_psus:
            if psu.wattage >= required_power:
                selected_psu = psu
                break

    # -------------------------
    # Price
    # -------------------------

    total_price = (
        selected_cpu.price +
        selected_gpu.price +
        selected_motherboard.price +
        selected_ram.price +
        selected_storage.price +
        selected_psu.price
    )

    return {
        "budget": budget,
        "purpose": purpose,
        "total_price": total_price,
        "build": {
            "cpu": selected_cpu,
            "gpu": selected_gpu,
            "motherboard": selected_motherboard,
            "ram": selected_ram,
            "storage": selected_storage,
            "psu": selected_psu
        }
    }