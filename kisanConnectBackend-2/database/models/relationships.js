const User = require('./User');
const Farmer = require('./Farmer');
const Buyer = require('./Buyer');
const Representative = require('./Representative');
const Admin = require('./Admin');
const { sequelize } = require('../dbConnection');
// user - buyer (one to one) (user can exist without buyer but buyer cannot exist without user)
    // user_id in buyers table  
User.hasOne(Buyer,{
    foreignKey : {
        name : 'user_id',
        allowNull : false 
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
 }) ;
Buyer.belongsTo(User,{foreignKey : 'user_id'});

// user - farmer (one to one) (user can exist without farmer but farmer cannot exist without user)
    // user_id in farmers table  
User.hasOne(Farmer,{
    foreignKey : {
        name : 'user_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
 });
Farmer.belongsTo(User,{foreignKey : 'user_id'});

// user - representative (one to one) (user can exist without representative but representative cannot exist without user)
    // user_id in representatives table  
User.hasOne(Representative,{
    foreignKey : {
        name : 'user_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
 });
Representative.belongsTo(User,{foreignKey : 'user_id'});

// user - admin (one to one) (user can exist without admin but admin cannot exist without user)
    // user_id in admins table  
User.hasOne(Admin,{
    foreignKey : {
        name : 'user_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
 });
Admin.belongsTo(User,{foreignKey : 'user_id'});

module.exports = {
    User,
    Farmer,
    Buyer,
    Representative,
    Admin ,
    sequelize
};