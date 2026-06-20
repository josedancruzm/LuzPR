from backend.dao.ticket_dao import TicketDAO

class TicketHandler:

    async def create_ticket(self, database, ticket):
        return await TicketDAO().create_ticket(database, ticket)