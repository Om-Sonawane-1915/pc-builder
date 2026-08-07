from fastapi import APIRouter, HTTPException

from backend.data.cpus import CPUS
from backend.data.gpus import GPUS
from backend.data.motherboards import MOTHERBOARDS
from backend.data.rams import RAMS
from backend.data.storages import STORAGES
from backend.data.psus import PSUS

router = APIRouter()


@router.get("/build")
def build_pc(
    cpu_id: int,
    gpu_id: int,
    motherboard_id: int,
    ram_id: int,
    storage_id: int,
    psu_id: int,
    purpose: str = "Gaming"
):
    cpu = next((c for c in CPUS if c.id == cpu_id), None)
    gpu = next((g for g in GPUS if g.id == gpu_id), None)
    motherboard = next((m for m in MOTHERBOARDS if m.id == motherboard_id), None)
    ram = next((r for r in RAMS if r.id == ram_id), None)
    storage = next((s for s in STORAGES if s.id == storage_id), None)
    psu = next((p for p in PSUS if p.id == psu_id), None)

    if cpu is None:
        raise HTTPException(status_code=404, detail="CPU not found")

    if gpu is None:
        raise HTTPException(status_code=404, detail="GPU not found")

    if motherboard is None:
        raise HTTPException(status_code=404, detail="Motherboard not found")

    if ram is None:
        raise HTTPException(status_code=404, detail="RAM not found")

    if storage is None:
        raise HTTPException(status_code=404, detail="Storage not found")

    if psu is None:
        raise HTTPException(status_code=404, detail="PSU not found")

    warnings = []

    if cpu.socket != motherboard.socket:
        warnings.append("CPU and Motherboard sockets do not match.")

    if motherboard.ram_type != ram.type:
        warnings.append("Motherboard does not support this RAM type.")

    required_power = cpu.power + gpu.power + 150

    if psu.wattage < required_power:
        warnings.append(
            f"PSU wattage too low. Required: {required_power}W"
        )

    total_price = (
        cpu.price +
        gpu.price +
        motherboard.price +
        ram.price +
        storage.price +
        psu.price
    )

    # ==========================
    # Estimated FPS
    # ==========================

    cpu_score = cpu.gaming_score
    gpu_score = gpu.performance_score

    combined_score = (cpu_score * 0.35) + (gpu_score * 0.65)

    fps_1080 = int(combined_score * 2.1)
    fps_1440 = int(combined_score * 1.45)
    fps_4k = int(combined_score * 0.8)
    # ==========================
    # Game FPS Estimates
    # ==========================

    game_fps = {
        "Valorant": int(fps_1080 * 2.2),
        "CS2": int(fps_1080 * 1.8),
        "Fortnite": int(fps_1080 * 1.1),
        "GTA V": int(fps_1080 * 0.95),
        "Red Dead Redemption 2": int(fps_1080 * 0.65),
        "Cyberpunk 2077": int(fps_1080 * 0.55)
    }


    # ==========================
    # Bottleneck Calculation
    # ==========================

    bottleneck = abs(cpu.gaming_score - gpu.performance_score)

    if bottleneck <= 5:
        bottleneck_status = "🟢 Excellent Match"
    elif bottleneck <= 15:
        if cpu.gaming_score < gpu.performance_score:
            bottleneck_status = "🟡 Moderate CPU Bottleneck"
        else:
            bottleneck_status = "🟡 Moderate GPU Bottleneck"
    else:
        if cpu.gaming_score < gpu.performance_score:
            bottleneck_status = "🔴 Severe CPU Bottleneck"
        else:
            bottleneck_status = "🔴 Severe GPU Bottleneck"

    # ==========================
    # Overall Build Score
    # ==========================

    overall_score = int(
        (gpu.performance_score * 0.40) +
        (cpu.gaming_score * 0.30) +
        ((ram.capacity * 2) * 0.15) +
        ((storage.read_speed / 100) * 0.15)
    )

    overall_score = min(overall_score, 100)

    if overall_score >= 90:
        overall_rating = "⭐⭐⭐⭐⭐ Excellent"
    elif overall_score >= 80:
        overall_rating = "⭐⭐⭐⭐ Very Good"
    elif overall_score >= 70:
        overall_rating = "⭐⭐⭐ Good"
    elif overall_score >= 60:
        overall_rating = "⭐⭐ Average"
    else:
        overall_rating = "⭐ Entry Level"

    # ==========================
    # Build Tier
    # ==========================

    if overall_score >= 95:
        build_tier = "🏆 S Tier"
    elif overall_score >= 85:
        build_tier = "🥇 A Tier"
    elif overall_score >= 75:
        build_tier = "🥈 B Tier"
    elif overall_score >= 65:
        build_tier = "🥉 C Tier"
    else:
        build_tier = "📦 Entry Tier"

    # ==========================
    # Smart Recommendations
    # ==========================

    recommendations = []

    if purpose == "Gaming":
        recommendations.append(
            "🎮 Optimized for gaming performance."
        )
    elif purpose == "Programming":
        recommendations.append(
            "💻 Better CPU performance is recommended for compiling large projects."
        )
    elif purpose == "Streaming":
        recommendations.append(
            "📺 NVIDIA GPUs provide excellent hardware video encoding."
        )
    elif purpose == "Video Editing":
        recommendations.append(
            "🎬 More RAM and a fast NVMe SSD improve editing performance."
        )
    elif purpose == "Office":
        recommendations.append(
            "📄 This build is more than enough for everyday office work."
        )

    difference = gpu.performance_score - cpu.gaming_score

    if difference > 15:
        recommendations.append(
            "🎮 Your GPU is much stronger than your CPU. A faster processor would improve gaming performance."
        )
    elif difference < -15:
        recommendations.append(
            "🧠 Your CPU is much stronger than your GPU. Consider upgrading the graphics card."
        )
    else:
        recommendations.append(
            "✅ CPU and GPU are well balanced."
        )

    headroom = psu.wattage - required_power

    if headroom >= 250:
        recommendations.append(
            "⚡ Excellent PSU headroom for future upgrades."
        )
    elif headroom >= 100:
        recommendations.append(
            "🔋 PSU has sufficient upgrade headroom."
        )
    else:
        recommendations.append(
            "⚠ PSU is close to its recommended limit."
        )

    if total_price <= 70000:
        recommendations.append(
            "💰 Great budget gaming build."
        )
    elif total_price <= 120000:
        recommendations.append(
            "🔥 Excellent mid-range gaming build."
        )
    else:
        recommendations.append(
            "👑 High-end enthusiast gaming build."
        )

    return {
        "compatible": len(warnings) == 0,
        "warnings": warnings,
        "required_power": required_power,
        "total_price": total_price,

        "estimated_fps": {
            "1080p": fps_1080,
            "1440p": fps_1440,
            "4k": fps_4k
        },

        "game_fps": game_fps,
        
        "bottleneck": {
            "percentage": bottleneck,
            "status": bottleneck_status
        },
        "overall_score": {
        "score": overall_score,
        "rating": overall_rating,
        "tier": build_tier
    },

        "recommendations": recommendations,

        "build": {
            "cpu": cpu,
            "gpu": gpu,
            "motherboard": motherboard,
            "ram": ram,
            "storage": storage,
            "psu": psu
        }
    }