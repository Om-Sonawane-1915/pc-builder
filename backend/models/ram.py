from pydantic import BaseModel

class RAM(BaseModel):
    id: int
    name: str
    capacity: int
    speed: int
    type: str
    price: int