from fastapi import APIRouter, HTTPException
from pathlib import Path
import json

router = APIRouter()

@router.get("/data/sources")
async def list_data_sources():
    """Return structured data source entries from the data folder."""
    base = Path(__file__).resolve().parents[3]
    data_file = base / "data" / "atiokb_data_sources.json"
    if not data_file.exists():
        raise HTTPException(status_code=404, detail="Data sources file not found")

    try:
        with data_file.open("r", encoding="utf-8") as f:
            raw = json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load data: {e}")

    # Normalize keys to a simple schema
    normalized = []
    for item in raw:
        normalized.append({
            "id": item.get("nid") or item.get("id") or None,
            "title": item.get("title") or "",
            "summary": (item.get("body") or "").strip(),
            "use_cases": item.get("field_use_cases_description") or item.get("use_cases") or ""
        })

    return {"count": len(normalized), "sources": normalized}
