import ticketDAO from "../daos/ticket.dao.js";

class TicketRepository {
    async generateTicket(ticketData) {
        return await ticketDAO.createTicket(ticketData);
    }
}

export default new TicketRepository();
