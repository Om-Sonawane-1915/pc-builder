from backend.models.cpu import CPU

CPUS = [
    CPU(
    id=1,
    name="AMD Ryzen 5 7600",
    cores=6,
    threads=12,
    socket="AM5",
    power=65,
    price=18999
),

CPU(
    id=2,
    name="Intel Core i5-14600K",
    cores=14,
    threads=20,
    socket="LGA1700",
    power=125,
    price=28999
),

CPU(
    id=3,
    name="AMD Ryzen 7 7700X",
    cores=8,
    threads=16,
    socket="AM5",
    power=105,
    price=32999
)
]