from pydantic import BaseModel

class Motherboard(BaseModel):
    id: int
    brand: str
    name: str
    chipset: str
    socket: str
    ram_type: str
    wifi: bool
    m2_slots: int
    price: int