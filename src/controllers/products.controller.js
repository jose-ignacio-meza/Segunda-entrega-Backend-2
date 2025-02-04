import { isValidObjectId } from 'mongoose';
import productsServices from '../services/products.services.js'

const productsservices = new productsServices;

export const getProducts = async (req, res) => {
    try {
        const products = await productsservices.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Recibe un producto el cual debe tener name y quantity 
export const addProducts = async (req, res) => {
    const { product }= req.body;
    
    //Validaciones
    if(!product.name || !product.quantity)
        return res.status(404).send({status:"error", message:"El producto debe contar con un nombre y una cantidad"})
    try {
        const productExist = await productsservices.getProductByCode(product.code);
        if(!productExist){
            //crerar producto
            const result = await productsservices.createProduct(product);
            res.status(201).json(result);
        }else{
            //Update de la cantidad
            product.quantity+=productExist.quantity;
            const result = await productsservices.updateProduct(productExist._id,product);
            res.status(201).json(result);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { pid } = req.params;
    if (!isValidObjectId(pid)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }
    try {
        const product = await productsservices.getProductById(pid);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { pid } = req.params;
    const {product} = req.body;
    if (!isValidObjectId(pid))
        return res.status(400).json({ status:"error", message: 'El id del producto es invalido' });

    if(!product)
        return res.status(400).json({ status:"error", message: 'Es necesario ingresar un producto' });
    try {
        const updatedProduct = await productsservices.updateProduct(pid, product);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    if (!isValidObjectId(pid)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }
    try {
        const deletedProduct = await productsservices.deleteProduct(pid);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};