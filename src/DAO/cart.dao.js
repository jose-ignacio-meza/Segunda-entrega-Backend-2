import Cart from '../models/cart.model.js';
import mongoose from 'mongoose';

export default class CartDAO {
    
    async getAll(){
        try{
            const result = await Cart.find();
            return result; 
        }catch(error){
            throw new Error('Error al recuperar los carritos ,' + error.message);
        }
    }

    async createCart(cartData) {
        try {
            for (const p of cartData) {
                console.log("data del dao "+p.productId);
            }
            const newCart = new Cart({products:cartData});
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('Error creating cart: ' + error.message);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error('Cart not found');
            }
            return cart;
        } catch (error) {
            throw new Error('Error fetching cart: ' + error.message);
        }
    }
    
    async addProductCart(cartId, item) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error('No se encontro el cart');
            }
            cart.products.push(item);
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error adding item to cart: ' + error.message);
        }
    }

    async updateCart(cartId, updateData) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(cartId, updateData, { new: true });
            if (!updatedCart) {
                throw new Error('Cart not found');
            }
            return updatedCart;
        } catch (error) {
            throw new Error('Error updating cart: ' + error.message);
        }
    }

    async deleteCart(cid) {
        try {
            const deletedCart = await Cart.findByIdAndDelete(cid);
            if (!deletedCart) {
                throw new Error('Cart not found');
            }
            return deletedCart;
        } catch (error) {
            throw new Error('Error deleting cart: ' + error.message);
        }
    }

    async removeItemFromCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
                throw new Error('Cart not found');
            }
            // Convertir pid a ObjectId
            const objectIdPid = new mongoose.Types.ObjectId(pid);

            // Filtrar correctamente los productos
            cart.products = cart.products.filter(product => 
                !product.productId.equals(objectIdPid)  // Comparación correcta
            );
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error('Error removing item from cart: ' + error.message);
        }
    }

    async findByIdWithProducts(cid) {
        return await Cart.findById(cid).populate("products.productId");
    }

    async updateCart(cid, updatedProducts) {
        return await Cart.findByIdAndUpdate(cid, { products: updatedProducts }, { new: true });
    }


}

 