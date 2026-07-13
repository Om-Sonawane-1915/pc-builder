from pydantic import BaseModel


class CPU(BaseModel):
    id: int
    name: str
    cores: int
    threads: int
    price: int