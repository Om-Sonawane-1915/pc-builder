from fastapi import APIRouter

from backend.models.saved_build import SavedBuild
from backend.data.saved_builds import SAVED_BUILDS

router = APIRouter()


@router.get("/saved-builds")
def get_saved_builds():
    return SAVED_BUILDS


@router.post("/saved-builds")
def save_build(build: SavedBuild):
    SAVED_BUILDS.append(build)
    return {
        "message": "Build saved successfully."
    }


@router.delete("/saved-builds/{build_id}")
def delete_build(build_id: int):

    global SAVED_BUILDS

    SAVED_BUILDS = [
        b for b in SAVED_BUILDS
        if b.id != build_id
    ]

    return {
        "message": "Build deleted."
    }