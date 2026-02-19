from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.search import router as search_router
from app.routes.data_sources import router as data_sources_router

app = FastAPI(title="AI Advisor Prototype")

# Allow frontend dev servers to access API
app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000", "http://localhost:8000"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(search_router)
app.include_router(data_sources_router)
