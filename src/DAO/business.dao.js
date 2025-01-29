import businessModel from "../models/business.model.js";

export default class Business {

    getBusiness = async () => {
        try{
            let business = await businessModel.find();
            return business;
        }catch(error){
            console.log(error);
            return null
        }
    }

    getBusinessById = async (bid) => {
        try{
            let business = await businessModel.findOne({_id:bid});
            return business;
        }catch(error){
            console.log(error);
            return null
        }
    }

    saveBusiness = async (business) => {
        try{
            let result = await businessModel.create(business);
            return result;
        }catch(error){
            console.log(error);
            return null
        }
    }

    updateBusiness = async (id,order) => {
        try{
            let result = await businessModel.updateOne({_id:id},{$set:order});
            return result;
        }catch(error){
            console.log(error);
            return null
        }
    }
    
}