from pydantic import BaseModel

class Motherboard(BaseModel):
    id: int
    name: str
    socket: str
    price: int