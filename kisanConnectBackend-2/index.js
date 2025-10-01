const express = require('express')
const app = express()
require('dotenv').config()
const syncDatabase = require('./database/dbCreation')
// const {testConnection} = require('./database/dbConnection')
const port = process.env.PORT || 3000 

const AuctionController = require('./controllers/Auction/AuctionController');
const CropController = require('./controllers/Crop/CropController')
const LoginController = require('./controllers/Login-Signup/LoginController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const signup = require('./routes/signup')


// signup and login routes
app.post("/auth/login",LoginController.loginUser);
app.use('/signup',signup)

// get auctions based on query filters  
app.get("/auctions",AuctionController.getAuctionAll);

// get a specific auction by id
app.get("/auctions/:auctionId",AuctionController.getAuctionById);

// get auctions for a specific buyer
app.get("/auctions/buyer/:buyerId",AuctionController.getAuctionBuyer);

// create crop 
app.post("/crops/create-crop",CropController.createCrop);

// get pending crops for approval (admin only)
app.get("/crops/pending/:adminId",CropController.getPendingCrops);

// add crop to auction
app.post("/crops/add-to-auction",CropController.addToAuction);



app.listen(port, async () => {
    // await testConnection();
    await syncDatabase();
    console.log(`Example app listening on port ${port}`)
})
