import Ticket from "../models/Ticket.js";

class TicketDAO {
    async createTicket(ticketData) {
        return await Ticket.create(ticketData);
    }
}

export default new TicketDAO();
