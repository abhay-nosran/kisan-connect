const { sequelize , DataTypes } = require('../dbConnection');

const Auction = sequelize.define('Auction',{
    auction_id : {
        type : DataTypes.INTEGER ,
        primaryKey : true ,
        autoIncrement : true
    },
    //  crop_id to be added as a foreign key
    // farmer_id to be added as a foreign key
    base_price : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false
    },
    start_time : {
        type : DataTypes.Timestamp,
        allowNull : false
    },
    end_time : {
        type : DataTypes.Timestamp,
        allowNull : false
    },
    status : {
        type : DataTypes.ENUM('to be started','closed','closed'),
        allowNull : false,
        defaultValue : 'to be started'
    },
    highest_bid : {
        type : DataTypes.DECIMAL(10,2),
        defaultValue : 0.00
    },
    // highest_bidder_id foreign key to be added 
})

module.exports = Auction  ;