from fastapi import FastAPI
from backend.routers.cpu import router as cpu_router
from backend.routers.gpu import router as gpu_router

app = FastAPI()

app.include_router(cpu_router)
app.include_router(gpu_router)

@app.get("/")
def home():
    return {"message": "Welcome to PC Builder API"}

