const BuyerSignupService = require("./../../services/SignupService/BuyerSignupService")
class BuyerSignupController{

    constructor(){
        throw new Error("Can't create an instance of buyerSignupController static class") 
    }

    static async signup(req,res){
        // role is buyer 
        const {email , phone , password , buyerType , companyName}  = req.body ;

        if(!email || !phone || !password){
            res.status(400).json({message : "email/phone/password field missing"})
        }

        const params = {email : email , phone : phone , password : password , buyerType : buyerType || "" , companyName: companyName || ""} ;
        const response = await BuyerSignupService.signup(params) ;
        const status = response.status ;
        delete response.status ;
        res.status(status).json(response)

    }
}

module.exports = BuyerSignupController 