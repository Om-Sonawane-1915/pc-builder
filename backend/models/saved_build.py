from pydantic import BaseModel

class SavedBuild(BaseModel):
    id: int

    cpu: str
    gpu: str
    motherboard: str
    ram: str
    storage: str
    psu: str

    cpu_id: int
    gpu_id: int
    motherboard_id: int
    ram_id: int
    storage_id: int
    psu_id: int

    total_price: int
    purpose: str