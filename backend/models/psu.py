from pydantic import BaseModel

class PSU(BaseModel):
    id: int
    brand: str
    name: str
    wattage: int
    efficiency: str
    modular: str
    price: int