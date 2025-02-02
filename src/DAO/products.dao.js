import productsModel from '../models/products.model.js'

export default class Products{
    async getAll() {
        try {
            return await productsModel.find();
        } catch (error) {
            throw new Error(`Error getting products: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            return await productsModel.findById(id);
        } catch (error) {
            throw new Error(`Error getting product by id: ${error.message}`);
        }
    }

    async getByCode(code) {
        try {
            return await productsModel.findOne({code});
        } catch (error) {
            throw new Error(`Error getting product by id: ${error.message}`);
        }
    }

    async create(product) {
        try {
            return await productsModel.create(product);
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async update(id, product) {
        try {
            return await productsModel.findByIdAndUpdate(id, product, { new: true });
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await productsModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}

