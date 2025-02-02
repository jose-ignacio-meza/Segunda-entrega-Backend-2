class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getCarts() {
        return await this.dao.getAll();
    }

    async getCartById(cid) {
        return await this.dao.getCartById(cid);
    }

    async createCart(cart) {
        return await this.dao.createCart(cart);
    }

    async addProductCart(cid,product){
        return await this.dao.addProductCart(cid,product);
    }

    async updateCart(cid, cart) {
        return await this.dao.updateCart(cid, cart);
    }

    async deleteCart(cid) {
        return await this.dao.deleteCart(cid);
    }

    async deleteProductCart(cid,pid){
        return await this.dao.removeItemFromCart(cid,pid);
    }

    async getCartWithProducts(cid) {
        return await this.dao.findByIdWithProducts(cid);
    }

    async updateCartProducts(cid, updatedProducts) {
        return await this.dao.updateCart(cid, updatedProducts);
    }
}

export default CartRepository;