const {sequelize} = require("./../../database/models/relationships")
async function createUser(email,password,phone,role){
    try{
            await sequelize.query(
                `SELECT create_user_with_role(:email, :password, :phone, :role)`,
                    {
                        replacements: { email, password, phone ,role},
                        type: sequelize.QueryTypes.SELECT
                    }
            );

    }catch(err){
            const error = new Error() ;
            console.log("Error Creating User :" , err) ;

            if(err.name === 'SequelizeUniqueConstraintError'){
                error.status = 400 ;
                error.name = "usernameNotUnique" ;
                error.message = "Username or mobile number already used" ;
            }else{
                error.status = 500 ;
               error.name = "createUserError" ;
               error.message = "Error in creating user !"
            }
            throw error ;
    }
}

module.exports = createUser ; 