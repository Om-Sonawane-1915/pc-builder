from backend.models.ram import RAM

RAMS = [

    # ---------- DDR4 ----------

    RAM(
        id=1,
        brand="Corsair",
        name="Vengeance LPX",
        capacity=16,
        modules="2x8GB",
        speed=3200,
        type="DDR4",
        rgb=False,
        price=3999
    ),

    RAM(
        id=2,
        brand="Corsair",
        name="Vengeance LPX",
        capacity=32,
        modules="2x16GB",
        speed=3600,
        type="DDR4",
        rgb=False,
        price=7499
    ),

    RAM(
        id=3,
        brand="Kingston",
        name="Fury Beast",
        capacity=16,
        modules="2x8GB",
        speed=3200,
        type="DDR4",
        rgb=False,
        price=4299
    ),

    RAM(
        id=4,
        brand="G.Skill",
        name="Ripjaws V",
        capacity=32,
        modules="2x16GB",
        speed=3600,
        type="DDR4",
        rgb=False,
        price=7799
    ),

    # ---------- DDR5 ----------

    RAM(
        id=5,
        brand="Corsair",
        name="Vengeance",
        capacity=16,
        modules="2x8GB",
        speed=5600,
        type="DDR5",
        rgb=False,
        price=4999
    ),

    RAM(
        id=6,
        brand="Corsair",
        name="Vengeance RGB",
        capacity=32,
        modules="2x16GB",
        speed=6000,
        type="DDR5",
        rgb=True,
        price=9999
    ),

    RAM(
        id=7,
        brand="G.Skill",
        name="Trident Z5 RGB",
        capacity=32,
        modules="2x16GB",
        speed=6000,
        type="DDR5",
        rgb=True,
        price=11499
    ),

    RAM(
        id=8,
        brand="Kingston",
        name="Fury Beast",
        capacity=32,
        modules="2x16GB",
        speed=6000,
        type="DDR5",
        rgb=False,
        price=9499
    ),

    RAM(
        id=9,
        brand="TeamGroup",
        name="T-Force Delta RGB",
        capacity=32,
        modules="2x16GB",
        speed=6400,
        type="DDR5",
        rgb=True,
        price=11999
    ),

    RAM(
        id=10,
        brand="Crucial",
        name="Pro DDR5",
        capacity=32,
        modules="2x16GB",
        speed=5600,
        type="DDR5",
        rgb=False,
        price=8999
    )

]