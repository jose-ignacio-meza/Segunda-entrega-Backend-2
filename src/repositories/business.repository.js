import businessDTO from '../DAO/DTOs/business.dto.js'

export default class BusinessRepository {
    
    constructor(dao){
        this.dao = dao;
    }

    getBusiness = async() => {
        let result = await this.dao.getBusiness();
        return result;
    }

     getBusinessById = async(bid) => {
        let result = await this.dao.getBusinessById(bid);
        return result;
    }

    createBusiness = async(business) => {
        let result = await this.dao.saveBusiness(business);
        return result;
    }
    
    updateBusiness = async(bid,products) =>  {
        let result = await this.dao.updateBusiness(bid,products);
        return result;
    }

}