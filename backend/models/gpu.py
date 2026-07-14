from pydantic import BaseModel

class GPU(BaseModel):
    id: int
    name: str
    memory: int
    power: int
    price: int