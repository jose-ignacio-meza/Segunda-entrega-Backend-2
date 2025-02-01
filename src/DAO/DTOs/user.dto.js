export default class UserDTO {

    constructor(user){
        //Construimos un usuario para insertar mediante el dao en la base.
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.rol = user.rol;
        this.orders = user.orders;
    }

    getUser(user){
        //Informacion no relevante, el rol y el id queda fuera de la vista 
        let userVistaData= {}
        userVistaData.name = user.name;
        userVistaData.email = user.email; 
        userVistaData.order = user.order;
        return userVistaData;
    }
}
