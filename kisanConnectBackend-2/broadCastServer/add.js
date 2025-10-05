const client = require("./client")

async function add(){
    const value = {
        auctionId : 1 ,
        auctionPrice : 100 
    }
    for(let i = 0 ; i < 10 ; i++){
        client.rpush("auctions",JSON.stringify(value));

        value.auctionId = value.auctionId + 1;
        value.auctionPrice = value.auctionPrice + 1 ;
    }
}

add() ;