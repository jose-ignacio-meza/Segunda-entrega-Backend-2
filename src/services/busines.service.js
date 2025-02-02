import Business from '../dao/business.dao.js';
import BusinessRepository from "../repositories/business.repository.js";

const businessDAO = new Business();
const businessrepositori= new BusinessRepository (businessDAO);

export default class businessServices {
    
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

    async createBusiness(businessData) {
        let result = await businessrepositori.createBusiness(businessData);
        return result;
    }

    async updateBusiness(bid,business){
        let result = await businessrepositori.updateBusiness(bid,business);
        return result;
    }

    async deleteProduct(bid,pid,quantity){
        let result = await businessrepositori.deleteProduct(bid,pid,quantity);
        return result;
    }
    
}