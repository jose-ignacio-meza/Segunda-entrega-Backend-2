import UserDTO from "../DAO/DTOs/user.dto.js";

export default class UserRepository {

    constructor(dao){
        //Recibimos el dao que vamos a utilizar
        this.dao = dao;
    }

    getUsers = async () => {
        let result = await this.dao.getUsers;
        return result;
    }

    getUserById = async (id) => {
        let result = await this.dao.getUserById(id);
        return result;
    }
    getUserByEmail = async (email) => {
        let result = await this.dao.getUserByEmail(email);
        return result;
    }
    
    saveUser = async (user) => {
        let userToInsert = new UserDTO(user);
        let result = await this.dao.saveUser(userToInsert);
        return result;
    }

    updateUser = async (id,user) => {
        let result = await this.dao.updateUser(id,user);
        return result;
    }

}