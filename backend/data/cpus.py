from backend.models.cpu import CPU

CPUS = [

    CPU(
        id=1,
        brand="AMD",
        name="Ryzen 5 5600",
        generation="Ryzen 5000",
        cores=6,
        threads=12,
        socket="AM4",
        power=65,
        gaming_score=82,
        productivity_score=78,
        price=11999
    ),

    CPU(
        id=2,
        brand="AMD",
        name="Ryzen 5 5600X",
        generation="Ryzen 5000",
        cores=6,
        threads=12,
        socket="AM4",
        power=65,
        gaming_score=85,
        productivity_score=80,
        price=13999
    ),

    CPU(
        id=3,
        brand="AMD",
        name="Ryzen 5 7600",
        generation="Ryzen 7000",
        cores=6,
        threads=12,
        socket="AM5",
        power=65,
        gaming_score=90,
        productivity_score=85,
        price=18999
    ),

    CPU(
        id=4,
        brand="AMD",
        name="Ryzen 7 7700",
        generation="Ryzen 7000",
        cores=8,
        threads=16,
        socket="AM5",
        power=65,
        gaming_score=93,
        productivity_score=91,
        price=27999
    ),

    CPU(
        id=5,
        brand="AMD",
        name="Ryzen 7 7700X",
        generation="Ryzen 7000",
        cores=8,
        threads=16,
        socket="AM5",
        power=105,
        gaming_score=94,
        productivity_score=92,
        price=32999
    )

]