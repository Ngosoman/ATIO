from app.database import innovations_collection

async def search_innovations(filters: dict):
    query = {}

    if filters.get("country"):
        query["countries"] = filters["country"]

    if filters.get("theme"):
        query["tags"] = {"$in": [filters["theme"]]}

    results = innovations_collection.find(query).limit(15)
    return await results.to_list(length=15)
