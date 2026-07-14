from backend.models.motherboard import Motherboard

MOTHERBOARDS = [
    Motherboard(
        id=1,
        name="MSI B650 Gaming Plus WiFi",
        socket="AM5",
        ram_type="DDR5",
        price=17999
    ),
    Motherboard(
        id=2,
        name="ASUS TUF B760-PLUS WiFi",
        socket="LGA1700",
        ram_type="DDR5",
        price=18999
    )
]