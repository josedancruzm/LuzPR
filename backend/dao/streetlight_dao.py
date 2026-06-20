class StreetLightDAO:
    
    async def get_all_streetlights(self, database):
        query = """
        SELECT light_id, latitude, longitude, city
        FROM street_light
        """

        rows = await database.fetch_all(query)
        return [dict(row) for row in rows]

    async def get_streetlight_by_city(self, database, city):
        query = """
        SELECT light_id, latitude, longitude, city
        FROM street_light
        WHERE city = :city"""

        rows = await database.fetch_all(query,values={"city":city})
        return [dict(row) for row in rows]