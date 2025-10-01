const {User} = require("../../database/models/relationships");
const Token = require("../../auth/Token");

// loginService is static class 
class loginService {

   static async login(loginDetails){
        const {email , password} = loginDetails;

        // check if email exists in the db or not 
        try {
            const user = await User.findOne({where : {email : email}});
            if(!user){
                return {status : 404 , message : "User not found"};
            }

            // now userName exists , check if password is correct or not
            if(user.passwordHash !== password){
                return {status : 401 , message : "Incorrect password"};
            }

            // user is authenticated 

            const payload = {
                userId : user.userId ,
                userName : user.userName ,
                role : user.role,
                roleId : user.roleId
            }
            // need to return jwt token and user details 
            
            const token = Token.generateToken(payload);
            
            return {status : 200 , message : "Login successful" , token , user : payload} ; 
        }catch(err){
            if(err.name === "TokenGenerationError"){
                console.error("Error in generating token , (Service layer) ") ;
            }else{
                console.error("Error in the Database while finding user : " , err) ; 
            }
            return {status : 500 , message : "Internal server error"};
        }
   }

}

module.exports = loginService;