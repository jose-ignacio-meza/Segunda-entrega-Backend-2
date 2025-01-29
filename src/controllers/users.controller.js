// import User from '../dao/user.dao.js';
// import UserRepository from '../repositories/user.repository.js';
// const user = new User();
// const userRepositorio = new UserRepository (user);
import userService from '../services/user.services.js'

const userservice = new userService();

export const getUsers = async (req, res) => {
    let result = await userservice.getUser();
    res.send({status:"success",result})
}

export const getUserById = async (req, res) => {
    const {uid} = req.params;
    let result = await userservice.getUserById(uid);
    res.send({status:"success",result})
}

export const saveUser = async (req, res) => {
    const user = req.body; 
    //Las validaciones quedan para uds
    try{
        console.log('llego aca ');
        let result = await userservice.saveUser(user);
        res.send({status:"success",result})
    }catch(error){
        res.status(500).send('Hubo un error :'+ error.message)
    }
}

export const dataCurrent = async (req,res)=>{
    
}