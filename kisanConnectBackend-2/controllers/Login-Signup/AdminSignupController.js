const AdminSignupService = require("../../services/SignupService/AdminSignUpService")
class AdminSignupController{

    constructor(){
        throw new Error("Can't create an instance of AdminSignupController static class") 
    }

    static async signup(req,res){
        // role is admin 
        const {email , phone , password}  = req.body ;

        if(!email || !phone || !password){
            res.status(400).json({message : "email/phone/password field missing"})
        }

        const params = {email : email , phone : phone , password : password} ;
        const response = await AdminSignupService.signup(params) ;
        const status = response.status ;
        delete response.status ;
        res.status(status).json(response)

    }
}

module.exports = AdminSignupController 