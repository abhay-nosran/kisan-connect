const { Sequelize , DataTypes } = require('sequelize');

// Supabase connection configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.SUPABASE_HOST,
  port: process.env.SUPABASE_PORT, // Default PostgreSQL port for Supabase
  database: process.env.SUPABASE_DATABASE,
  username: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const Auction = sequelize.define("Auction", {
  auctionId : {
        type : DataTypes.INTEGER ,
        primaryKey : true ,
        autoIncrement : true ,
        field : 'auction_id'
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
    highestBidder : {
        type : DataTypes.INTEGER,
        field : "highest_bidder"
    },basePrice : {
        type : DataTypes.DECIMAL(10,2),
        allowNull : false,
        field : 'base_price'
    },
},
{ tableName: "auctions", timestamps: false });

module.exports = {sequelize,Auction} ;


