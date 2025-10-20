const express = require("express") ;
const subscribeController = require("./SubscribeController")
const messageReader = require("./messageReader")
const cors = require("cors")
const app = new express() ;
const PORT = 3333

app.use(cors()) ;
messageReader() ;

app.get("/subscribe",subscribeController) ;

app.listen(PORT,()=>{
    console.log(`Register is listening on ${PORT}`)
})


