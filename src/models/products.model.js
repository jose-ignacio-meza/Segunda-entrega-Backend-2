import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});

const productsModel = mongoose.model('Product', productSchema);

export default productsModel;