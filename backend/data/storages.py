from backend.models.storage import Storage

STORAGES = [
    Storage(
        id=1,
        name="Samsung 990 Pro",
        type="NVMe SSD",
        capacity=1000,
        price=9999
    ),
    Storage(
        id=2,
        name="WD Blue HDD",
        type="HDD",
        capacity=2000,
        price=4999
    )
]