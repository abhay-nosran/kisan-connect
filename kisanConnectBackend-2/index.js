const express = require('express')
const app = express()
const cors = require("cors")
require('dotenv').config()
const syncDatabase = require('./database/dbCreation')
// const {testConnection} = require('./database/dbConnection')
const port = process.env.PORT || 3000 
app.use(cors())

const CropController = require('./controllers/Crop/CropController')
const LoginController = require('./controllers/Login-Signup/LoginController');
const BiddingController = require('./controllers/Bidding/BiddingController')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const signup = require('./routes/signup')
const buyer = require('./routes/buyer')


// signup and login routes
app.post("/login",LoginController.loginUser);

app.use('/signup',signup)

app.use('/buyer',buyer) 

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
