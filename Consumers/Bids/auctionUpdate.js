const {Auction} = require("./dbConnection")
const client = require("./client") 
async function updateHighestBid({ buyerId, bidAmount, auctionId }) {
    // 1️⃣ Fetch auction by ID
    const auction = await Auction.findByPk(auctionId);

    if (!auction) return;

    // 2️⃣ Check if auction is live
    if (auction.status !== "live") return;

    // 3️⃣ Check bid amount validity
    const INCREMENT = 100;
    const minBid = Math.max(auction.basePrice, auction.highestBid || 0) + INCREMENT;
    if (bidAmount < minBid) return;

    // 4️⃣ Update the auction record
    await Auction.update(
        {
            highestBid: bidAmount,
            highestBidder: buyerId,
        },
        {
            where: { auctionId },
        }
    );

     try{
        const message = {
        auctionId : auctionId ,
        currentPrice : bidAmount 
        }
                    
        await client.rpush("auctions",JSON.stringify(message)) ;
        console.log("Message sent to Redis !")
        }catch(err){
             console.log("Error in sending message to redis :", err)
        }
}

module.exports = updateHighestBid ;