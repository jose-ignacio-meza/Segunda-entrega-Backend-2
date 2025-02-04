import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products", // Referencia a la colección de productos
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

// Exportar el modelo
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
