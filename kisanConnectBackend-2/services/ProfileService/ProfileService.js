const  {Buyer, User } = require('../../database/models/relationships');

class ProfileService {

    constructor(){
        throw new error("can't create object of a static ProfileService Class") 
    }

    static async getbuyerProfile(buyerId){

        try {

            const data = await Buyer.findOne({
                where : {
                    buyerId : buyerId,
                },
                include : [
                    {
                        model : User,
                        attributes : ["email","phone"]
                    }
                ],
                attributes : ["buyerType","companyName","verified"] 
            })
            console.log(data);
            return data 
        } catch (err) {
            throw err ;
        }
    }
}

module.exports = ProfileService 