from fastapi import APIRouter
from app.models import SearchRequest, SearchResponse, InnovationResponse
from app.services.query_parser import parse_query
from app.services.search_service import search_innovations
from app.services.reranker import rerank_results
from app.services.advisor_frame import generate_advisor_frame

router = APIRouter()

@router.post("/search", response_model=SearchResponse)
async def search_endpoint(request: SearchRequest):

    # Step 1: Parse Query
    filters = await parse_query(request.query)

    # Step 2: DB Search
    results = await search_innovations(filters)

    if not results:
        return SearchResponse(
            understood_context="No relevant innovations found.",
            top_recommendations=[],
            you_may_also_consider=[]
        )

    # Step 3: Rerank
    ranking = await rerank_results(request.query, results)

    scored_results = []
    for item in ranking:
        idx = item["index"] - 1
        if idx < len(results):
            scored_results.append(
                InnovationResponse(
                    title=results[idx]["title"],
                    why_recommended=results[idx].get("ai_summary", ""),
                    relevance_score=item["score"]
                )
            )

    # Step 4: Advisor Frame
    frame = await generate_advisor_frame(request.query)

    return SearchResponse(
        understood_context=frame,
        top_recommendations=scored_results[:3],
        you_may_also_consider=[
            "Related water management systems",
            "Community-based agricultural models",
            "Climate resilience tools"
        ]
    )
