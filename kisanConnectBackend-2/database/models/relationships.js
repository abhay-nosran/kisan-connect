const User = require('./User');
const Farmer = require('./Farmer');
const Buyer = require('./Buyer');
const Representative = require('./Representative');
const Admin = require('./Admin');
const { sequelize } = require('../dbConnection');
const Bid = require('./Bid');
const Auction = require('./Auction');
const Crop = require('./Crop');
// user - buyer (one to one) (user can exist without buyer but buyer cannot exist without user)
    // user_id in buyers table  
User.hasOne(Buyer,{
    foreignKey : {
        name : 'userId',
        field : 'user_id',
        allowNull : false 
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
 }) ;
Buyer.belongsTo(User,{foreignKey : 'userId'});

// user - farmer (one to one) (user can exist without farmer but farmer cannot exist without user)
    // user_id in farmers table  
User.hasOne(Farmer,{
    foreignKey : {
        name : 'userId',
        field : 'user_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
 });
Farmer.belongsTo(User,{foreignKey : 'userId'});

// user - representative (one to one) (user can exist without representative but representative cannot exist without user)
    // user_id in representatives table  
User.hasOne(Representative,{
    foreignKey : {
        name : 'userId',
        field : 'user_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
 });
Representative.belongsTo(User,{foreignKey : 'userId'});

// user - admin (one to one) (user can exist without admin but admin cannot exist without user)
    // user_id in admins table  
User.hasOne(Admin,{
    foreignKey : {
        name : 'userId',
        field : 'user_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
 });
Admin.belongsTo(User,{foreignKey : 'userId'});


// buyer - bids (one to many) (buyer can exist without bids but bid cannot exist without buyer)
    // buyer_id in bids table
Buyer.hasMany(Bid,{
    foreignKey : {
        name : 'buyerId',
        field : 'buyer_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
});
Bid.belongsTo(Buyer,{foreignKey : 'buyerId'});

// auction - bids (one to many) (auction can exist without bids but bid cannot exist without auction)
    // auction_id in bids table
Auction.hasMany(Bid,{
    foreignKey : {
        name : 'auctionId',
        field : 'auction_id',
        allowNull : false},
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
    })
Bid.belongsTo(Auction,{foreignKey : 'auctionId'});

// auction - buyer (one to one) (higgest bidder) 
Buyer.hasOne(Auction,{
    foreignKey : {
        name : 'higgestBidder',
        field : 'highest_bidder',
        allowNull : true
    },
    onDelete : 'SET NULL',
    onUpdate : 'CASCADE'
})
Auction.belongsTo(Buyer,{foreignKey : 'higgestBidder'});

// crop - auction (one to one) (crop can exist without auction but auction cannot exist without crop)
    // crop_id in auctions table
Crop.hasOne(Auction,{
    foreignKey : {
        name : 'cropId',
        field : 'crop_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
});
Auction.belongsTo(Crop,{foreignKey : 'cropId'});

// farmer - crop (one to many) (farmer can exist without crops but crop cannot exist without farmer)
    // farmer_id in crops table
Farmer.hasMany(Crop,{
    foreignKey : {
        name : 'farmerId',
        field : 'farmer_id',    
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
});
Crop.belongsTo(Farmer,{foreignKey : 'farmerId'});

// representative - crop (one to many) (representative can exist without crops but crop cannot exist without representative)
    // representative_id in crops table
Representative.hasMany(Crop,{
    foreignKey : {
        name : 'representativeId',
        field : 'representative_id',
        allowNull : false
    },
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE'
});
Crop.belongsTo(Representative,{foreignKey : 'representativeId'});

// crop - admin (many to one) (crop can exist without admin but admin can exist without crops)
    // approved_by_admin_id in crops table
Admin.hasMany(Crop,{
    foreignKey : {
        name : 'approvedByAdminId',
        field : 'approved_by_admin_id',
        allowNull : true    
    },
    onDelete : 'SET NULL',
    onUpdate : 'CASCADE'
});
Crop.belongsTo(Admin,{foreignKey : 'approvedByAdminId'});

module.exports = {
    User,
    Farmer,
    Buyer,
    Representative,
    Admin ,
    Bid,
    Auction,
    Crop,
    sequelize
};