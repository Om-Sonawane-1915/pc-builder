from pydantic import BaseModel

class RAM(BaseModel):
    id: int
    brand: str
    name: str
    capacity: int
    modules: str
    speed: int
    type: str
    rgb: bool
    price: int