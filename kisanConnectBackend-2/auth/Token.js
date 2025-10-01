const jwt = require('jsonwebtoken');
require('dotenv').config();

class Token {

    static generateToken(payload){
        try{
            const token = jwt.sign(payload , process.env.JWR_SECRET , {expiresIn : process.env.JWR_EXPIRES_IN});
            return token ;
        }catch(err){
            console.error("Error in generating token : " , err);
            const error = new Error("Error in generating token");
            error.name = "TokenGenerationError" ;
            throw  error ;
        }
    }

    static verifyToken(token){

        try{
            const decoded = jwt.verify(token , process.env.JWR_SECRET);
            return {valid : true , expired : false , decoded , message : "Token is valid"};
        }catch(err){
            if(err.name === "TokenExpiredError"){
                return {valid : false , expired : true , decode : null , message : "Token is expired"} ;
            }
            if(err.name === "JsonWebTokenError"){
                return {valid : false , expired : false , decode : null , message : err.message} ;
            }
        }
    }

    constructor(){
        throw new Error("Token is a static class and cannot be instantiated") ;
    }
}

module.exports = Token ;