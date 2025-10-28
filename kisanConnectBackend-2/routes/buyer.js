const express = require("express") ;
const authenticateUser = require("../middlewares/authenticateUser");
const authorizeUser = require("../middlewares/authorizeUser");

const AuctionController = require("../controllers/Auction/AuctionController")
const BiddingController = require("../controllers/Bidding/BiddingController");
const ProfileController = require("../controllers/Profile/ProfileController");

const router = express.Router() ;


// will take out buyerId from JWT


// get auctions based on query filters  
// buyerId verification not required
router.get("/auctions",authenticateUser,authorizeUser("buyer"),AuctionController.getAuctionAll);

// get a specific auction by id
// buyerId verification not required
router.get("/auctions/auction/:auctionId",authenticateUser,authorizeUser("buyer"),AuctionController.getAuctionById);

// get auctions for a specific buyer
// buyerId verification is required
router.get("/auctions/buyer",authenticateUser,authorizeUser("buyer"),AuctionController.getAuctionBuyer);

// to place a bid 
// buyer verification is required 
router.post("/placeBid",authenticateUser,authorizeUser("buyer"),BiddingController.placeBid)

// to get won auctions
router.get("/auctions/won",authenticateUser,authorizeUser("buyer"),AuctionController.getWonAuctionsBuyer) ;

// to get buyerInfo
router.get("/",authenticateUser,authorizeUser("buyer"),ProfileController.getbuyerProfile)
module.exports = router ;