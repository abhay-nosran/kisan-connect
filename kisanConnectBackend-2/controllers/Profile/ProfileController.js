const ProfileService = require("../../services/ProfileService/ProfileService") ;
class ProfileController {

    constructor(){
        throw new error("can't create object of a static ProfileController Class") 
    }

    static async getbuyerProfile(req,res) {
        
        const buyerId = req.decoded.roleId ;

        try{
            const data = await ProfileService.getbuyerProfile(buyerId);
            res.status(200).json(data) ;
        }catch(err){
            res.status(500).json({error : err}) ;
        }
    }
}

module.exports = ProfileController ;