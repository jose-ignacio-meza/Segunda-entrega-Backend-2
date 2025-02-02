import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import config from '../configs/config.js'
import { createHash , isValidPassword } from '../utils.js'
import { cookieExtractor } from '../configs/passport.config.js';
import userServices from '../services/user.services.js'
import UserDTO from '../DAO/DTOs/user.dto.js';

const userservice = new userServices();

export const current =  async (req, res) => {
    try {
        // Extraer el token de las cookies
        const token = cookieExtractor(req);

        //Si no encuentro el token devuelvo el error
        if (!token) {
            return res.status(401).send({
                status: false,
                message: 'No se encontró el token en las cookies',
                payload: null
            });
        }

        // Validar el token y obtener el payload
        const decodedToken = jwt.verify(token, config.secret_key);

        // Respuesta exitosa con los datos validados del token
        return res.status(200).send({
            status: true,
            message: 'Token válido',
            payload: decodedToken
        });
    } catch (error) {
        // Manejo de errores en la validación del token
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).send({
                status: false,
                message: 'El token es inválido',
                payload: null
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).send({
                status: false,
                message: 'El token ha expirado',
                payload: null
            });
        }

        // Errores inesperados
        return res.status(500).send({
            status: false,
            message: 'Error interno del servidor',
            payload: error.message
        });
    }
}

export const login = async (req,res) => {
    
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", message: 'Incomplete values'});
    
    try{
        const user = await userservice.getUserByEmail(email);
        if(!user){
            return res.status(401).send({status:"error", message:"Usuario no encontrado"});
        }
        
        const isMatch = isValidPassword(user,password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        console.log(req.session);
        req.session.user = user;
        const userVista= new UserDTO(user);
        let token = jwt.sign( userVista.getUser(user), config.secret_key, { expiresIn : "24h"});
        res.cookie('tokenCookie', token, {httpOnly: true, maxAge:60*60*1000 }).send({status:"succes", message:"Acceso correcto"});
    }catch(error){
        console.error('Error al iniciar sesión');
        res.status(500).send('Error al iniciar sesión: '+error.message);
    }

}

export const registrarse = async (req,res) => {
    
    const {id, first_name, last_name, email, age, rol ,password} = req.body;

    if (!id || !first_name || !last_name || !email || !age|| !rol) 
        return res.status(400).send({ status: false, message: 'All fields are required' });
    try{
        let existeId = await userservice.getUserByIdLocal(id);
        if(existeId)
            return res.status(404).send({status:"error", message:"Ya existe un usuario con el id "+id});
        let existeEmail = await userservice.getUserByEmail(email);
        if(existeEmail)
            return res.status(404).send({status:"error", message:"El mail ya esta registrado"})
        
        let newUser = new User({
            id,
            first_name, 
            last_name,
            email, 
            age,
            rol,
            password
        });

        let result = await userservice.saveUser(newUser);
        if(!result) return res.status(404).send({status:"error", message:"No se pudo cargar el usuario"})
        res.status(200).send({status:"sucess", message:"Se registro correctamente al usuario "+result.first_name})
    }catch(error){
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar usuario');
    }
}


export const restorePasword = async (req, res) => {
    const {email, newPassword} = req.body;
    try{
        const user = await userServices.getUserByEmail(email);
        if (!user) {
            return res.status(400).send({ status: 'error', message: 'User not found' });
        }

        user.password = createHash(newPassword);
        await user.save();

        return res.redirect('/login'); // Redirige a la vista de login

    }catch (error) {
        return res.status(500).send({ status: 'error', message: 'Internal server error' });
    }
}

export const cerrarSession = (req, res) => {
    req.session.destroy( (error) => {
        if(error){
            console.error('Error al cerrar sesión');
            res.status(500).send('Error al cerrar sesión');
        } else{
            res.redirect('/login');
        }
    })
}