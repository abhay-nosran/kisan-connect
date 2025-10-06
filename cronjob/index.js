const express = require("express")
require('dotenv').config()

const app = new express() ;
const port = process.env.PORT || 4000 ;


app.listen(port , ()=>{
    console.log(`Cron Service is Running on port : ${port}`) ;
})