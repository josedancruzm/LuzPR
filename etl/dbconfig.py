import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

PG_DB_CONFIG = {
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT"),
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "sslmode": os.getenv("DB_SSLMODE", "require"),
}

POOL_CONFIG = {
    "minconn": 1,
    "maxconn": 10
}

def get_connection():
    return psycopg2.connect(**PG_DB_CONFIG)