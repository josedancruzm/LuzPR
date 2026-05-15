from fastapi import FastAPI
from databases import Database
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from contextlib import asynccontextmanager
import os

from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

load_dotenv()
database_url = os.getenv("DATABASE_URL", "")
database = Database(database_url)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    yield
    await database.disconnect()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/lightposts")
async def get_lightposts():
    query = """
    SELECT light_id, latitude, longitude, city
    FROM light_post
    """

    rows = await database.fetch_all(query)
    return [dict(row) for row in rows]

@app.get("/lightposts/city/{city}")
async def get_lightpost_by_city(city: str):
    query = """
    SELECT light_id, latitude, longitude, city
    FROM light_post
    WHERE city = :city"""

    rows = await database.fetch_all(query,values={"city":city})
    return [dict(row) for row in rows]