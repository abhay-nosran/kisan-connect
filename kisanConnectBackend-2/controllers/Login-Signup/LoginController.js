const loginService = require("../../services/LoginService/loginService");
class LoginController {
    constructor(){
        throw new err("can't create an instance of LoginController")
    }
    static async loginUser(req,res){

        // take out the email and password from req body
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({message : "email or password missing"})
        }

        // have email and password 
        
        const response = await loginService.login({email , password}) ;
        const status = response.status || 500 ;
        delete response.status ; // remove status from response object
        res.status(status).json(response) ;
        
    }
}


module.exports = LoginController ;