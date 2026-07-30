from backend.models.gpu import GPU

GPUS = [

    GPU(
        id=1,
        brand="NVIDIA",
        name="RTX 4060",
        generation="RTX 4000",
        memory=8,
        power=115,
        performance_score=80,
        ray_tracing_score=88,
        price=29999
    ),

    GPU(
        id=2,
        brand="NVIDIA",
        name="RTX 4070",
        generation="RTX 4000",
        memory=12,
        power=200,
        performance_score=90,
        ray_tracing_score=94,
        price=54999
    ),

    GPU(
        id=3,
        brand="NVIDIA",
        name="RTX 4070 Super",
        generation="RTX 4000",
        memory=12,
        power=220,
        performance_score=94,
        ray_tracing_score=96,
        price=61999
    ),

    GPU(
        id=4,
        brand="NVIDIA",
        name="RTX 4070 Ti Super",
        generation="RTX 4000",
        memory=16,
        power=285,
        performance_score=97,
        ray_tracing_score=98,
        price=82999
    ),

    GPU(
        id=5,
        brand="NVIDIA",
        name="RTX 4080 Super",
        generation="RTX 4000",
        memory=16,
        power=320,
        performance_score=99,
        ray_tracing_score=99,
        price=109999
    ),

    GPU(
        id=6,
        brand="NVIDIA",
        name="RTX 4090",
        generation="RTX 4000",
        memory=24,
        power=450,
        performance_score=100,
        ray_tracing_score=100,
        price=179999
    )

]