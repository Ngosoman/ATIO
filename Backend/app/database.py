from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_URL"))
db = client["ai_advisor_db"]

innovations_collection = db["innovations"]
