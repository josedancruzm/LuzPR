from fastapi import FastAPI
from databases import Database
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from fastapi.responses import FileResponse
from pathlib import Path
from backend.dao.ticket_dao import Ticket
from backend.handler.streetlight_handler import StreetLightHandler
import os

from backend.handler.ticket_handler import TicketHandler

BASE_DIR = Path(__file__).resolve().parent
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

# ---------- Web Page Endpoints ---------- $
@app.get("/")
async def serve_main():
    return FileResponse(UI_DIR / "html" / "main.html")

@app.get("/login")
async def serve_login():
    return FileResponse(UI_DIR / "html" / "login.html")


# ---------- Street Light Endpoints ---------- $

# get all street lights
@app.get("/streetlights")
async def get_all_streetlights():
    return await StreetLightHandler().get_all_streetlights(database)

# get street light by id
@app.get("/streetlights/city/{city}")
async def get_streetlight_by_city(city: str):
    return await StreetLightHandler().get_streetlight_by_city(database, city)

# ---------- Ticket Light Endpoints ---------- $
@app.post("/tickets")
async def create_ticket(ticket: Ticket):
    return await TicketHandler().create_ticket(database, ticket)