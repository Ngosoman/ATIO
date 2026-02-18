from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    query: str

class InnovationResponse(BaseModel):
    title: str
    why_recommended: str
    relevance_score: float

class SearchResponse(BaseModel):
    understood_context: str
    top_recommendations: List[InnovationResponse]
    you_may_also_consider: List[str]
