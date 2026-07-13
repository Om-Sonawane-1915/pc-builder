from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Welcome to PC Builder API"}

@app.get("/cpus")
def get_cpus():
    return [
        {
            "id": 1,
            "name": "AMD Ryzen 5 7600",
            "cores": 6,
            "threads": 12,
            "price": 18999
        }
    ]