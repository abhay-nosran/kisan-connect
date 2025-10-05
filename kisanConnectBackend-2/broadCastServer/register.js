const express = require("express") ;
const subscribeController = require("./SubscribeController")
const messageReader = require("./messageReader")

const app = new express() ;
const PORT = 3333


messageReader() ;

app.get("/subscribe",subscribeController) ;

app.listen(PORT,()=>{
    console.log(`Register is listening on ${PORT}`)
})


