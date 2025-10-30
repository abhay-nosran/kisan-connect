const KafkaProducer = require("./../../kafka/KafkaProduce") 

async function sendBid({buyerId , auctionId , bidAmount}){

    await KafkaProducer.send({
        topic : "bids",
        message : {buyerId,auctionId,bidAmount},
        key : (auctionId%2)
    }) ;
}


module.exports = sendBid ;