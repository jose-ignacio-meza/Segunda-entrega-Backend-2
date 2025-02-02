export default class UserDTO {

    constructor(user){
        //Construimos un usuario para insertar mediante el dao en la base.
        this.id = user.id;
        this.first_name = user.first_name;
        this.last_name=user.last_name
        this.email = user.email;
        this.rol = user.rol;
        this.age=user.age;
        this.password= user.password;
        this.orders = user.orders;
    }

    getUser(user){
        //Informacion no relevante, el rol y el id queda fuera de la vista 
        let userVistaData= {}
        userVistaData.first_name = user.first_name;
        userVistaData.last_name = user.last_name;
        userVistaData.email = user.email; 
        userVistaData.orders = user.orders ? user.orders : [];
        userVistaData.rol = user.rol ? user.rol : "user";

        return userVistaData;
    }
}
