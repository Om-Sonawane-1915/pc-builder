from pydantic import BaseModel

class CPU(BaseModel):
    id: int
    name: str
    cores: int
    threads: int
    socket: str
    power: int
    price: int