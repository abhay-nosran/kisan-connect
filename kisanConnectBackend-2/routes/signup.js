const express = require("express")
const router = express.Router() ;

const BuyerSignupController = require("../controllers/Login-Signup/BuyerSignupController");
const FarmerSignupController = require("../controllers/Login-Signup/FarmerSignupController");
const RepresentativeSignupController = require("../controllers/Login-Signup/RepresentativeSignupController");
const AdminSignupController = require("../controllers/Login-Signup/AdminSignupController");

router.post('/buyer',BuyerSignupController.signup) ;
router.post('/farmer',FarmerSignupController.signup) ;
router.post("/representative",RepresentativeSignupController.signup) ;
router.post('/admin',AdminSignupController.signup) ;

module.exports = router ;