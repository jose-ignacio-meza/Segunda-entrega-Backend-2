import Cart from '../dao/cart.dao.js';
import CartRepository from "../repositories/cart.repository.js";
import Ticket from "../models/ticket.model.js";

const cartDAO = new Cart();
const cartRepository = new CartRepository(cartDAO);

export default class CartServices {

    constructor() {
        
    }

    async getCarts() {
        let result = await cartRepository.getCarts();
        return result;
    }

    async getCartById(cid) {
        let result = await cartRepository.getCartById(cid);
        return result;
    }

    async createCart(cartData) {
        let result = await cartRepository.createCart(cartData);
        return result;
    }

    async addProductCart(cid,product){
        let result = await cartRepository.addProductCart(cid,product);
        return result;
    }

    async updateCart(cid, cart) {
        let result = await cartRepository.updateCart(cid, cart);
        return result;
    }

    async deleteCart(cid){
        let result = await cartRepository.deleteCart(cid);
        return result;
    }

    async deleteProductCart(cid, pid) {
        let result = await cartRepository.deleteProductCart(cid, pid);
        return result;
    }
    
    async purchaseCart(cid, purchaserEmail) {
        
        const cart = await cartRepository.getCartWithProducts(cid);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        let totalAmount = 0;
        let purchasedProducts = [];
        let remainingProducts = [];

        for (const item of cart.products) {
            const product = item.productId;
            const quantity = item.quantity;

            if (product.quantity >= quantity) {
                // Descontar stock
                product.quantity -= quantity;
                await product.save();

                totalAmount += product.valor * quantity;
                purchasedProducts.push({ productId: product._id, quantity });
            } else {
                // Producto sin stock suficiente
                remainingProducts.push({ productId: product._id, quantity });
            }
        }

        // Generar ticket si hay productos comprados
        let ticket = null;
        if (purchasedProducts.length > 0) {
            ticket = new Ticket({
                amount: totalAmount,
                purchaser: purchaserEmail,
            });
            await ticket.save();
        }

        // Actualizar carrito con los productos restantes
        await cartRepository.updateCartProducts(cid, remainingProducts);

        return {
            ticket,
            remainingProducts
        };
    }
}