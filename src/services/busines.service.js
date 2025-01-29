import Business from '../dao/bussines.dao.js';
import BusinessRepository from "../repositories/user.repository.js";

const businessDAO = new Business();
const businessrepositori= new BusinessRepository (businessDAO);

export default class userServices {
    
    constructor(){
        
    }

    async getBusiness(){
        let result = await businessrepositori.getBusiness();
        return result;
    }

    async getBusinessById(bid){
        let result = await businessrepositori.getBusinessById(bid);
        return result;
    }

    async createBusiness (businessData) {
        let result = await businessrepositori.createBusiness(businessData);
        return result;
    }

    async addProduct(){
        
    }
    
}