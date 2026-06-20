from backend.dao.streetlight_dao import StreetLightDAO

class StreetLightHandler:

    async def get_all_streetlights(slef, database):
        return await StreetLightDAO().get_all_streetlights(database)
    
    async def get_streetlight_by_city(self, database, city):
        return await StreetLightDAO().get_streetlight_by_city(database, city)