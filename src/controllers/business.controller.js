import { isValidObjectId } from 'mongoose';
import businessServices from '../services/busines.service.js'

const businessService = new businessServices;

export const getBusiness = async (req, res) => {
    try{
        let result = await businessService.getBusiness();
        if(!result){ 
            return res.status(500).send({status: "error", error: "No hay ningun negocio cargado"});
        }
        return res.send({status:"success", result})
    }catch(error){
        res.status(500).send({status:"error" , error: error.message});
    }
}

export const getBusinessById = async (req, res) => {
    const {bid} = req.params;
    if(!isValidObjectId(bid)){
        return res.status(404).send({status:"error", error:"El id no es valido"});
    }
    try{
        let result = await businessService.getBusinessById(bid);
        if(!result) return res.status(500).send({status: "error", error: "El id no corresponde a un negocio cargado."});
        res.send({status:"success",result})
    }catch(error){
        res.status(500).send({status:"error" , error: error.message});
    }
}

export const createBusiness = async (req, res) => {
    const business = req.body;
    if(!business.name){
        return res.status(404).send("Se requiere el nombre del negocio");
    }
    let messageProducts = "";
    if(business.products.length == 0){
        messageProducts="sin productos";
    }
    try{    
        let result = await businessService.createBusiness(business);
        if(!result) return res.status(500).send({status: "error", error: "Algo salio mal, intenta mas tarde"});
        res.send({status:"success",message:"Se creo el negocio "+messageProducts,result})

    }catch(error){
        res.status(500).send({status:"error" , error: error.message});
    }
}

export const addProduct = async (req, res) => {
    //Recupero datos
    const {product, quantity} = req.body;
    console.log(product);
    const bid = req.params.bid;
    //Valido datos
    if (!isValidObjectId(bid))
        return res.status(404).send({status:"error", error:"El id ingresado es invalido"});
    if(typeof product !== "string"){
        return res.status(404).send({status:"error", error:"Se debe ingresar el nombre de un producto"});
    }
    if(typeof quantity !== "number")
        return res.status(404).send({status:"error", error:"Se debe ingresar un numero como cantidad"})
    
    try{
        const business = await businessService.getBusinessById(bid);
        // Verificar si el negocio existe
        if(!business) 
            return res.status(404).send({status:"error", error:"No se encuentra el negocio co nel id "+bid})
        // Verificar si el producto ya existe
        const existingProduct = business.products.find(p =>p.name === product);
        if (existingProduct) {
            // Si el producto existe, actualizar la cantidad.
            existingProduct.quantity += quantity;
        } else {
            // Si el producto no existe, agregarlo al arreglo de productos.
            business.products.push({ name: product, quantity: quantity });
        }
        //Actualiza los productos del negocio.
        await businessService.updateBusiness(business._id,business);
        res.send({status:"success",result:"Negocio Actualizado"})
    }catch(error){
        res.status(500).send({status:"error" , error: error.message});
    }
}

export const deleteProduct = async (req,res)=>{
    const {pid,quantity} = req.body;
    const {bid}= req.params
    //Validacion
    if(!isValidObjectId(bid))
        return res.status(404).send({status:"error",message:"El id del negocio ingresado es invalido"})
    if (!isValidObjectId(pid))
        return res.status(404).send({status:"error",message:"El id del producto ingresado es invalido"})
    if(typeof quantity !== "number")
        return res.status(404).send({status:"error", error:"Se debe ingresar un numero como cantidad"})
    if(quantity < 1)
        return res.status(404).send({status:"error",message:"El numero de cantidada debe ser 1 o superior"});
    
    try{
        let result = await businessService.deleteProduct(bid,pid,quantity);
        if(!result)
            return res.status(404).send({status:"error", message:"No hay un resultado"});
        return result;
    }catch(error){
        return res.status(500).send({status:"error",message:"Error :"+error.message})
    }
}