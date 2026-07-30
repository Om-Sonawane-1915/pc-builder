from backend.models.storage import Storage

STORAGES = [

    # ---------- NVMe SSD ----------

    Storage(
        id=1,
        brand="Samsung",
        name="990 Pro",
        type="NVMe SSD",
        capacity=1000,
        interface="PCIe 4.0",
        read_speed=7450,
        write_speed=6900,
        price=9999
    ),

    Storage(
        id=2,
        brand="WD",
        name="Black SN850X",
        type="NVMe SSD",
        capacity=1000,
        interface="PCIe 4.0",
        read_speed=7300,
        write_speed=6600,
        price=9499
    ),

    Storage(
        id=3,
        brand="Kingston",
        name="KC3000",
        type="NVMe SSD",
        capacity=1000,
        interface="PCIe 4.0",
        read_speed=7000,
        write_speed=6000,
        price=8799
    ),

    Storage(
        id=4,
        brand="Crucial",
        name="P5 Plus",
        type="NVMe SSD",
        capacity=1000,
        interface="PCIe 4.0",
        read_speed=6600,
        write_speed=5000,
        price=8299
    ),

    Storage(
        id=5,
        brand="Samsung",
        name="870 EVO",
        type="SATA SSD",
        capacity=1000,
        interface="SATA",
        read_speed=560,
        write_speed=530,
        price=6999
    ),

    Storage(
        id=6,
        brand="WD",
        name="Blue HDD",
        type="HDD",
        capacity=1000,
        interface="SATA",
        read_speed=150,
        write_speed=150,
        price=3999
    ),

    Storage(
        id=7,
        brand="Seagate",
        name="Barracuda",
        type="HDD",
        capacity=2000,
        interface="SATA",
        read_speed=190,
        write_speed=190,
        price=5499
    )

]