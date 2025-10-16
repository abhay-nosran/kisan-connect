function authorizeUser(...allowedRoles){
    return (req,res,next) => {

        if(!req.decoded || !allowedRoles.includes(req.decoded.role)){
            return res.status(403).json({message : "Forbidden : roleType mismatch"}) ;
        }

        next() ;
    }
}

module.exports = authorizeUser ;