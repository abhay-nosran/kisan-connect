const createUser = require("./createUser")
class BuyerSignupService {

    static async signup(params){
        // email , password , phone , buyerType     

        // just call function create_user_with_role
        //  built in the db itself
        const {email , password , phone} = params ;
    
        try {   
            await createUser(email,password,phone,"buyer") ;
            return {status : 200 , message : "Buyer user created successfully."} ;
        }catch(err){

            return {status : err.status , message : err.message} ;
        }   

        // return {status : 501 , message : "Service not available right now"}
    }

    
}


module.exports = BuyerSignupService 