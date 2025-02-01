//import Business from '../dao/business.dao.js';
import sessionRepository from "../repositories/session.repository.js";

//const businessDAO = new Business();
const sessionrepositori= new sessionRepository (businessDAO);

export default class sessionServices {
    
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
    
}