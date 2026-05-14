import geopandas as gpd
import pandas as pd
from pathlib import Path
from pyogrio import list_layers
from etl.dbconfig import get_connection

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"

LAYER_TABLE_MAP = {
    "lightpost": "light_post",
    "trafficlight": "traffic_light",
    "firehydrant": "fire_hydrant",
}

def ETL_main(cur):
    kml_files = list(DATA_DIR.glob("*.kml"))

    ##outloop searches for every municipal's kml file
    for file in kml_files:

        #using stem to strip name from file extension
        city = file.stem.lower()
        

        layers = list_layers(file)
        for layer, _ in layers:
            layer_ref = layer.split("_")[1].lower() #splitting to get the utility, like lightpost, firehydrant, etc
            table = LAYER_TABLE_MAP.get(layer_ref)

            if table is None:
                print(f"No table mapped for layer: {layer}, skipping.")
                continue

            df = gpd.read_file(file, driver="KML", engine="pyogrio", layer=layer)

            inserted_rows = 0

            for _, row in df.iterrows():
                #set the kml's geometry column as a geom
                geom = row["geometry"]
                cur.execute(
                    f"""
                    INSERT INTO {table} (latitude, longitude, city)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (latitude, longitude) DO NOTHING
                    """,
                    (
                        #row["Name"] if pd.notna(row["Name"]) else None,
                        geom.y, #split the geom parameters in latitude and longitude
                        geom.x,
                        city
                    )
                )
                inserted_rows += cur.rowcount
                        

            print(f"Loaded {inserted_rows} rows into {table} table from layer {layer}.")

def main():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT current_database(), current_user;")
            row = cur.fetchone()
            print("Connected:", row)

            ETL_main(cur)

        conn.commit()

if __name__ == "__main__":
    main()