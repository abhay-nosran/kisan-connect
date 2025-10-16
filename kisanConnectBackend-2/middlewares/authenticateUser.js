const jwt = require("jsonwebtoken") ;

function authenticateUser(req,res,next){

    const authHeader = req.headers["authorization"] ;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try{

        const decoded = jwt.verify(token,process.env.JWR_SECRET) ;
        req.decoded = decoded ;
        console.log("Decoded :" , decoded)
        next() ;
    }catch(err){
        console.error("JWT verification failed:", err.message);
        return res.status(403).json({ message: "Invalid or expired token." });
    }
    
}

module.exports = authenticateUser ;