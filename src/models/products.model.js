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
    valor:{
        type:Number,
        required:true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});

const productsModel = mongoose.model('products', productSchema);

export default productsModel;