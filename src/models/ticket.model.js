import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Para generar códigos únicos

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        default: uuidv4 // Genera un código único automáticamente
    },
    purchase_datetime: {
        type: Date,
        default: Date.now // Guarda la fecha y hora de la compra
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

// Exportamos el modelo
const Ticket = mongoose.model('tickets', ticketSchema);
export default Ticket;