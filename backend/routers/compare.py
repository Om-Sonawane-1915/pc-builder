from fastapi import APIRouter, HTTPException

from backend.data.cpus import CPUS
from backend.data.gpus import GPUS

router = APIRouter()


@router.get("/compare/cpu")
def compare_cpu(id1: int, id2: int):

    cpu1 = next((c for c in CPUS if c.id == id1), None)
    cpu2 = next((c for c in CPUS if c.id == id2), None)

    if cpu1 is None or cpu2 is None:
        raise HTTPException(status_code=404, detail="CPU not found")

    if cpu1.gaming_score > cpu2.gaming_score:
        winner = cpu1.name
    elif cpu2.gaming_score > cpu1.gaming_score:
        winner = cpu2.name
    else:
        winner = "Tie"

    return {
        "component1": cpu1,
        "component2": cpu2,
        "winner": winner
    }


@router.get("/compare/gpu")
def compare_gpu(id1: int, id2: int):

    gpu1 = next((g for g in GPUS if g.id == id1), None)
    gpu2 = next((g for g in GPUS if g.id == id2), None)

    if gpu1 is None or gpu2 is None:
        raise HTTPException(status_code=404, detail="GPU not found")

    if gpu1.performance_score > gpu2.performance_score:
        winner = gpu1.name
    elif gpu2.performance_score > gpu1.performance_score:
        winner = gpu2.name
    else:
        winner = "Tie"

    return {
        "component1": gpu1,
        "component2": gpu2,
        "winner": winner
    }