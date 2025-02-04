import { isValidObjectId } from 'mongoose';
import CartServices from '../services/cart.services.js';
import productsServices from '../services/products.services.js';
import {senMail} from '../utils.js'

const cartService = new CartServices();
const productService = new productsServices();

export const getCarts = async (req, res) => {
    try {
        const result = await cartService.getCarts();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartService.getCartById(cid);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const createCart = async (req, res) => {
    const { products } = req.body;

    // Verificar si se enviaron productos y si es un array válido
    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ status: "error", message: "Se debe ingresar al menos un producto" });
    }

    // Validaciones de cada producto
    for (const p of products) {
        if (!p.productId || !p.quantity) {
            return res.status(400).json({ status: "error", message: "Cada producto debe incluir un 'productId' y una 'quantity'" });
        }

        if (!isValidObjectId(p.productId)) {
            return res.status(400).json({ status: "error", message: `El ID del producto ${p.productId} no es válido` });
        }
    }

    try {
        const result = await cartService.createCart(products);
        return res.status(201).json({ status: "success", message: "Carrito creado con éxito", data: result });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Hubo un error en el servidor: " + error.message });
    }
};

export const addProductCart = async (req, res) => {
    const {cid} = req.params;
    //Recibe un objeto llamado "product" que contiene "productId" y "quantity".
    const {product} = req.body;
    if(!cid || !product)
        return res.status(400).send({status:"error", message:"Debe ingresar un id de cart y un objeto producto con su id y quantity"})
    if(!isValidObjectId(cid))
        return res.status(400).send({status:"error", message:"El id del cart es invalido"})
    if(!isValidObjectId(product.productId))
        return res.status(400).send({status:"error", message:"El id del producto es invalido"})
    try {
        const result = await cartService.addProductCart(cid, product);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateCart = async (req,res) =>{
    const { cid } = req.params;
    const {cart} = req.body;
    //validaciones
    if (!isValidObjectId(cid))
        return res.status(404).send({status:"error", message:"El id ingresado no es valido"})
    if(!cart)
        return res.status(404).send({status:"error", message:"Se debe ingresar un carrito para actualizar el anterior"})

    try {
        const result = await cartService.updateCart(cid,cart);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartService.deleteCart(cid);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteProductCart = async (req, res) => {  
    const { cid, pid } = req.params;

    if(!isValidObjectId(cid))
        return res.status(404).send({status:"error", message:"El id de cart es invalido"});
    if(!isValidObjectId(pid))
        return res.status(404).send({status:"error", message:"El id del producto es invalido"});
    
    try { 
        let cart = await cartService.getCartById(cid);
        const existeProduct= cart.products.findIndex(p=>p.productId == pid)  
        if(existeProduct == -1)
            return res.status(404).send({status:"error", message:"El producto no se encuentra en el cart"});
        const result = await cartService.deleteProductCart(cid,pid);
        res.status(200).send({status:"sucess", data:result});
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const purchase = async (req, res) => {
    try {
        const { cid } = req.params;
        //const cart = cartService.getCartById(cid);
        const purchaserEmail = req.user.email; // Asumiendo autenticación

        const result = await cartService.purchaseCart(cid, purchaserEmail);
        let ticket= {
            status: "success",
            message: "Compra realizada",
            ticket: result.ticket || "No se generó ticket, todos los productos estaban sin stock suficiente",
            remainingProducts: result.remainingProducts
        };
        let tittle='Ticket de compra';
        if(result.ticket){
            let messagehtml=`<div>
                                <h1>Gracias por su compra</h1>
                            </div>
                            <div>
                                <h2>Total: ${JSON.stringify(result.ticket.amount)}</h2>
                                <h3>Codigo de compra: ${JSON.stringify(result.ticket.code)}</h3>
                            </div>`
            await senMail(purchaserEmail,tittle,messagehtml);
        }   
        
        return res.json({
            status: "success",
            message: "Compra finalizada",
            ticket: result.ticket || "No se generó ticket, todos los productos estaban sin stock suficiente",
            remainingProducts: result.remainingProducts
        });
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Error en la compra: " + error.message });
    }
};