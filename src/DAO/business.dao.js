import businessModel from "../models/business.model.js";

export default class Business {

    getBusiness = async () => {
        try{
            let business = await businessModel.find();
            return business;
        }catch(error){
            console.log(error);
            return null
        }
    }

    getBusinessById = async (bid) => {
        try{
            let business = await businessModel.findOne({_id:bid});
            return business;
        }catch(error){
            console.log(error);
            return null
        }
    }

    saveBusiness = async (business) => {
        try{
            let result = await businessModel.create(business);
            return result;
        }catch(error){
            console.log(error);
            return null
        }
    }

    updateBusiness = async (id,products) => {
        try{
            let result = await businessModel.updateOne({_id:id},{$set:products});
            return result;
        }catch(error){
            console.log(error);
            return null
        }
    }

    deleteProduct = async (bid,pid,quantity) =>{
        try {
            // Buscar el negocio por su ID
            const business = await businessModel.findById(bid);
            if (!business) {
                return { status: 'error', message: 'Negocio no encontrado' };
            }
    
            const productIndex = business.products.findIndex(p => p._id.toString() === pid.toString());
            if (productIndex === -1) {
                console.log(`Producto con ID: ${pid} no encontrado`);
                return { status: 'error', message: 'Producto no encontrado' };
            }
    
            const product = business.products[productIndex];

            // Restar la cantidad especificada
            product.quantity -= quantity;

            // Si la cantidad del producto es 0 o menos, eliminar el producto del arreglo
            if (product.quantity <= 0) {
                business.products.splice(productIndex, 1);
            }
    
            // Guardar los cambios
            const result = await business.save();
            return { status: 'success', data: result };
        } catch (error) {
            return { status: 'error', message: `Error al eliminar el producto: ${error.message}` };
        }
    }
    
}