from backend.models.gpu import GPU

GPUS = [
    GPU(
        id=1,
        name="NVIDIA GeForce RTX 5070",
        vram=12,
        price=54999
    ),
    GPU(
        id=2,
        name="AMD Radeon RX 9070 XT",
        vram=16,
        price=59999
    ),
    GPU(
        id=3,
        name="NVIDIA GeForce RTX 5060 Ti",
        vram=16,
        price=42999
    )
]