from backend.models.psu import PSU

PSUS = [

    PSU(
        id=1,
        brand="Corsair",
        name="CX550",
        wattage=550,
        efficiency="80+ Bronze",
        modular="Non Modular",
        price=4499
    ),

    PSU(
        id=2,
        brand="Cooler Master",
        name="MWE 650",
        wattage=650,
        efficiency="80+ Bronze",
        modular="Non Modular",
        price=5199
    ),

    PSU(
        id=3,
        brand="Corsair",
        name="RM750e",
        wattage=750,
        efficiency="80+ Gold",
        modular="Fully Modular",
        price=8999
    ),

    PSU(
        id=4,
        brand="MSI",
        name="MAG A750GL",
        wattage=750,
        efficiency="80+ Gold",
        modular="Fully Modular",
        price=8699
    ),

    PSU(
        id=5,
        brand="Cooler Master",
        name="MWE Gold 850",
        wattage=850,
        efficiency="80+ Gold",
        modular="Fully Modular",
        price=9999
    ),

    PSU(
        id=6,
        brand="Seasonic",
        name="Focus GX-850",
        wattage=850,
        efficiency="80+ Gold",
        modular="Fully Modular",
        price=11499
    ),

    PSU(
        id=7,
        brand="Corsair",
        name="RM1000x",
        wattage=1000,
        efficiency="80+ Gold",
        modular="Fully Modular",
        price=14999
    )

]