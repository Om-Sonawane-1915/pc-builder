from pydantic import BaseModel

class Storage(BaseModel):
    id: int
    brand: str
    name: str
    type: str
    capacity: int
    interface: str
    read_speed: int
    write_speed: int
    price: int