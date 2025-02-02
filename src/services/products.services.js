import Products from '../DAO/products.dao.js';
import productsRepository from '../repositories/products.repository.js';

const productsDAO = new Products();
const productsrepositori = new productsRepository(productsDAO);

export default class productsServices{
    cosntructor(){

    }

    async getAllProducts() {
        try {
            const products = await productsrepositori.getAll();
            return products;
        } catch (error) {
            throw new Error('Error getting products: ' + error.message);
        }
    };

    async getProductById (id){
        try {
            const product = await productsrepositori.getById(id);
            return product;
        } catch (error) {
            throw new Error('Error getting product: ' + error.message);
        }
    };

    async getProductByCode(pcode){
        try {
            const product = await productsrepositori.getByCode(pcode);
            return product;
        } catch (error) {
            throw new Error('Error getting product: ' + error.message);
        }
    }
    async createProduct(productData){
        try {
            const newProduct = await productsrepositori.create(productData);
            return newProduct;
        } catch (error) {
            throw new Error('Error creating product: ' + error.message);
        }
    };

    async updateProduct(id, productData){
        try {
            const updatedProduct = await productsrepositori.update(id, productData);
            return updatedProduct;
        } catch (error) {
            throw new Error('Error updating product: ' + error.message);
        }
    };

    async deleteProduct(id){
        try {
            await productsrepositori.delete(id);
        } catch (error) {
            throw new Error('Error deleting product: ' + error.message);
        }
    };

}
