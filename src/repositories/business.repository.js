import businessDTO from '../DAO/DTOs/business.dto.js'

export default class BusinessRepository {
    
    constructor(dao){
        this.dao = dao;
    }

    async getBusiness () {
        let result = await this.dao.getBusiness();
        return result;
    }

    async getBusinessById (bid){
        let result = await this.dai.getBusinessById(bid);
        return result;
    }

    async createBusiness(business){
        let result = await this.dao.saveBusiness(business);
        return result;
    }

    async updateBusiness (bid,order) {
        let result = await this.dao.updateBusiness(bid,order);
        return result;
    }

}