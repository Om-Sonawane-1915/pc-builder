from pydantic import BaseModel

class Storage(BaseModel):
    id: int
    name: str
    type: str
    capacity: int
    price: int