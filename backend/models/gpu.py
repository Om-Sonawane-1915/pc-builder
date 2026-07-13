from pydantic import BaseModel


class GPU(BaseModel):
    id: int
    name: str
    vram: int
    price: int