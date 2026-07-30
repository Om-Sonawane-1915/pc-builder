from pydantic import BaseModel

class CPU(BaseModel):
    id: int
    brand: str
    name: str
    generation: str
    cores: int
    threads: int
    socket: str
    power: int
    gaming_score: int
    productivity_score: int
    price: int