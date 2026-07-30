from backend.models.motherboard import Motherboard

MOTHERBOARDS = [

    # ---------- AMD AM4 ----------

    Motherboard(
        id=1,
        brand="MSI",
        name="B550 Gaming Plus",
        chipset="B550",
        socket="AM4",
        ram_type="DDR4",
        wifi=False,
        m2_slots=2,
        price=11999
    ),

    Motherboard(
        id=2,
        brand="ASUS",
        name="TUF Gaming B550-Plus",
        chipset="B550",
        socket="AM4",
        ram_type="DDR4",
        wifi=True,
        m2_slots=2,
        price=14999
    ),

    Motherboard(
        id=3,
        brand="Gigabyte",
        name="B550 AORUS Elite",
        chipset="B550",
        socket="AM4",
        ram_type="DDR4",
        wifi=False,
        m2_slots=2,
        price=13999
    ),

    # ---------- AMD AM5 ----------

    Motherboard(
        id=4,
        brand="MSI",
        name="B650 Gaming Plus WiFi",
        chipset="B650",
        socket="AM5",
        ram_type="DDR5",
        wifi=True,
        m2_slots=3,
        price=17999
    ),

    Motherboard(
        id=5,
        brand="ASUS",
        name="TUF Gaming B650-Plus WiFi",
        chipset="B650",
        socket="AM5",
        ram_type="DDR5",
        wifi=True,
        m2_slots=3,
        price=19999
    ),

    Motherboard(
        id=6,
        brand="Gigabyte",
        name="B650 Eagle AX",
        chipset="B650",
        socket="AM5",
        ram_type="DDR5",
        wifi=True,
        m2_slots=3,
        price=18999
    ),

    Motherboard(
        id=7,
        brand="MSI",
        name="MAG X670E Tomahawk WiFi",
        chipset="X670E",
        socket="AM5",
        ram_type="DDR5",
        wifi=True,
        m2_slots=4,
        price=32999
    ),

    # ---------- Intel ----------

    Motherboard(
        id=8,
        brand="MSI",
        name="PRO B760M-A WiFi",
        chipset="B760",
        socket="LGA1700",
        ram_type="DDR5",
        wifi=True,
        m2_slots=2,
        price=15999
    ),

    Motherboard(
        id=9,
        brand="ASUS",
        name="TUF Gaming B760-PLUS WiFi",
        chipset="B760",
        socket="LGA1700",
        ram_type="DDR5",
        wifi=True,
        m2_slots=3,
        price=18999
    ),

    Motherboard(
        id=10,
        brand="Gigabyte",
        name="B760 Gaming X AX",
        chipset="B760",
        socket="LGA1700",
        ram_type="DDR5",
        wifi=True,
        m2_slots=3,
        price=17999
    ),

    Motherboard(
        id=11,
        brand="MSI",
        name="MAG Z790 Tomahawk WiFi",
        chipset="Z790",
        socket="LGA1700",
        ram_type="DDR5",
        wifi=True,
        m2_slots=4,
        price=28999
    ),

    Motherboard(
        id=12,
        brand="ASUS",
        name="ROG Strix Z790-E Gaming WiFi",
        chipset="Z790",
        socket="LGA1700",
        ram_type="DDR5",
        wifi=True,
        m2_slots=5,
        price=42999
    )

]