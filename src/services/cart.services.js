import Cart from '../dao/cart.dao.js';
import CartRepository from "../repositories/cart.repository.js";
import Products from '../DAO/products.dao.js';
import ProductsRepository from '../repositories/products.repository.js';
import Ticket from "../models/ticket.model.js";

const cartDAO = new Cart();
const cartRepository = new CartRepository(cartDAO);
const productDao = new Products();
const productRepository = new ProductsRepository(productDao);

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

    async addProductCart(cartId,product){
        
        const existeCart = await cartRepository.getCartById(cartId);
        if (!existeCart) {
            throw new Error("El carrito no existe");
        }
        
        const existeProduct = await productRepository.getById(product.productId);
        if (!existeProduct) {
            throw new Error("El producto no existe");
        }
    
        // 🔹 Buscamos el producto dentro del carrito
        const productoEnCarrito = existeCart.products.find(p => 
            p.productId.toString() === product.productId.toString()
        );
        
        if (productoEnCarrito) {
            // 🔹 Si el producto existe, sumamos la cantidad
            productoEnCarrito.quantity += product.quantity;
        } else {
            // 🔹 Si el producto no está en el carrito, lo agregamos
            existeCart.products.push({
                productId: product.productId,
                quantity: product.quantity
            });
        }

        // 🔹 Guardamos los cambios en el carrito
        return await cartRepository.updateCartProducts(cartId, existeCart.products);
        
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