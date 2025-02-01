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
    const {product} = req.body;
    if(typeof product !== "string"){
        return res.status(404).send({status:"error", error:"Se debe ingresar el nombre de un producto"});
    }
    try{
        const business = await businessService.getBusinessById(req.params.bid);
        business.products.push(product);
        await businessService.updateBusiness(business._id,business);
        res.send({status:"success",result:"Negocio Actualizado"})
    }catch(error){
        res.status(500).send({status:"error" , error: error.message});
    }
}