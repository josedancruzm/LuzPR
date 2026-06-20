from datetime import datetime, timezone
from typing import Optional

from pydantic import BaseModel, Field


class Ticket(BaseModel):
    
    ticket_id :         Optional[int] = None
    luma_number :       Optional[int] = None
    light_id :          Optional[int] = None
    status_id:          Optional[int] = None
    created_at :        datetime = Field(default_factory=lambda: datetime.now(timezone.utc).replace(microsecond=0))
    resolved_at :       Optional[datetime] = None

class TicketDAO:
    
    async def create_ticket(self, database, ticket: Ticket) -> int:

        query = """
            INSERT INTO ticket (luma_number, light_id, status_id, created_at, resolved_at)
            
            VALUES (
                :luma_number,
                :light_id,
                :status_id,
                :created_at,
                :resolved_at
            )
            RETURNING ticket_id;        
        """
         
        values = ticket.model_dump()

        return await database.fetch_val(query, values)