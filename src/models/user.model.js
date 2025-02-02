import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const collection = 'Users';
const schema = new mongoose.Schema({
    id:{ type: Number, required: true},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    age:{type:Number, required:true},
    role: { type: String, default: 'user' },
    orders: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Orders'
        }
    ]
});

// 🔹 Middleware de Mongoose para hashear la contraseña antes de guardar
schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// 🔹 Método para comparar contraseñas en el modelo
schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model(collection,schema);
export default userModel;