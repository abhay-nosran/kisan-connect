const express = require("express")
const router = express.Router() ;

const BuyerSignupController = require("../controllers/Login-Signup/BuyerSignupController")

router.post('/buyer',BuyerSignupController.signup) ;

module.exports = router ;