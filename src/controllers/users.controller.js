import { isValidObjectId } from 'mongoose';
import userService from '../services/user.services.js'

const userservice = new userService();

export const getUsers = async (req, res) => {
    try{
        let result = await userservice.getUser();
        res.send({status:"success",result})
    }catch(error){
        res.status(500).send("Hubo un error:"+error.message);
    }
}

export const getUserById = async (req, res) => {
    const {uid} = req.params;
    if(!isValidObjectId(uid)){
        res.status(404).send("El id no es valido");
    }else{
        try{
            let result = await userservice.getUserById(uid);
            res.send({status:"success",result})
        }catch(error){
            res.status(500).send("Hubo un error :"+error.message);
        }
    }
}

export const saveUser = async (req, res) => {
    const user = req.body;
    if(!user.name || !user.email){
        let respuesta = "Se requiere completar el name y email.";
        res.status(404).send({status: "error", respuesta});
    }else{
        try{
            console.log('llego aca ');
            let result = await userservice.saveUser(user);
            res.send({status:"success",result})
        }catch(error){
            res.status(500).send('Hubo un error :'+ error.message)
        }
    }
}

export const dataCurrent = async (req,res)=>{
    
}