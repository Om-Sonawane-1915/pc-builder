from pydantic import BaseModel

class PSU(BaseModel):
    id: int
    name: str
    wattage: int
    price: int