from fastapi import FastAPI
from databases import Database
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from contextlib import asynccontextmanager
import os

from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent  # points to src/
UI_DIR = BASE_DIR / "ui"

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

# app.mount("/css", StaticFiles(directory=UI_DIR / "css"), name="css")
# app.mount("/js", StaticFiles(directory=UI_DIR / "js"), name="js")
# app.mount("/assets", StaticFiles(directory=UI_DIR / "assets"), name="assets")

@app.get("/")
async def serve_main():
    return FileResponse(UI_DIR / "html" / "main.html")

@app.get("/login")
async def serve_login():
    return FileResponse(UI_DIR / "html" / "login.html")

@app.get("/streetlights")
async def get_streetlights():
    query = """
    SELECT light_id, latitude, longitude, city
    FROM street_light
    """

    rows = await database.fetch_all(query)
    return [dict(row) for row in rows]

@app.get("/streetlights/city/{city}")
async def get_streetlight_by_city(city: str):
    query = """
    SELECT light_id, latitude, longitude, city
    FROM street_light
    WHERE city = :city"""

    rows = await database.fetch_all(query,values={"city":city})
    return [dict(row) for row in rows]