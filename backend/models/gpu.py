from pydantic import BaseModel

class GPU(BaseModel):
    id: int
    brand: str
    name: str
    generation: str
    memory: int
    power: int
    performance_score: int
    ray_tracing_score: int
    price: int