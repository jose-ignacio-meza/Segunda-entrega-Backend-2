import mongoose from 'mongoose';

const collection = 'Business';
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
});
const schema = new mongoose.Schema({
    name:String,
    products:[productSchema]
});

const businessModel = mongoose.model(collection,schema);
export default businessModel;