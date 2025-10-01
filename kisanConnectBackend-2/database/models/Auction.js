const { sequelize , DataTypes } = require('../dbConnection');

const Auction = sequelize.define('Auction',{
    auctionId : {
        type : DataTypes.INTEGER ,
        primaryKey : true ,
        autoIncrement : true ,
        field : 'auction_id'
    },
    //  crop_id to be added as a foreign key
    // farmer_id to be added as a foreign key
    basePrice : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false,
        field : 'base_price'
    },
    startTime : {
        type : DataTypes.DATE,
        allowNull : false,
        field : 'start_time'
    },
    endTime : {
        type : DataTypes.DATE,
        allowNull : false ,
        field : 'end_time'
    },
    status : {
        type : DataTypes.ENUM('to be started','live','closed'),
        allowNull : false,
        defaultValue : 'to be started'
    },
    highestBid : {
        type : DataTypes.DECIMAL(10,2),
        defaultValue : 0.00,
        field : 'highest_bid'
    },
    // highest_bidder_id foreign key to be added 
})

module.exports = Auction  ;