const redisClient = require("./redisClient")

async function notifier(row){
    // each row have [auction_id , new_status , final_price]
    const element = {
        auctionId : row[0] ,
        newStatus : row[1] 
    }

    try {
        await redisClient.rpush("auctions",JSON.stringify(element)) ;
    }catch(err){
        console.error("Error pushing to Redis:", err);
    }
    
    
}

module.exports = notifier ;