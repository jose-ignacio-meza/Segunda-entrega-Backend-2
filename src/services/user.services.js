import User from '../dao/user.dao.js';
import UserRepository from "../repositories/user.repository.js";

const userDAO = new User();
const userrepositori= new UserRepository (userDAO);

export default class userServices {
    
    constructor(){
        
    }

    async getUser(){
        let result = await userrepositori.getUsers();
        return result;
    }

    async getUserById(uid){
        let result = await userrepositori.getUserById(uid);
        return result;
    }

    async getUserByEmail(uemail){
        let result = await userrepositori.getUserByEmail(uemail);
        return result;
    }

    async saveUser (userData) {
        let result = await userrepositori.saveUser(userData);
        return result;
    }
    
}