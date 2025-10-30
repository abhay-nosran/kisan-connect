const { sequelize , Bid , Auction} = require("../../database/models/relationships");
const AuctionService = require("./../AuctionServices/AuctionService")
const client = require("./client")
const sendBid = require("./BidProducer")
let INCREMENT = 100 ;
class BiddingService {

    static async placeBid({ auctionId, buyerId, bidAmount }) {
        // bidAmount should be greater than (current highest bid + 100) and also greater than base price

            // get the current higest bid on the auction 
            let auction ;
            try{
                auction = await AuctionService.fetchAuctionByIdInternal(auctionId) ;
            }catch(err){
                if(err.name === "AuctionIdInValid") {
                    return {status : 400 , message : "AuctionId not found !"} ;
                }else{
                    console.log("Unexpected Error :" , err)
                    return {status : 500 , message : "Internal Server Error"} ;
                }
            }
            
            // check the auction is live or not 
            if(auction.status != "live"){
                return {status : 400, message : "Auction is not live !"}
            }

            const minBid = Math.max(auction.basePrice, auction.highestBid || 0) + INCREMENT;
            if (bidAmount < minBid) {
                return { status: 400, message: `Minimum bid amount: ${minBid}` };
            }

            // // bid amount greater than the basePrice + INCREMENT
            // if(auction.basePrice + INCREMENT > bidAmount){
            //     return {status : 400, message : `Minimum bid amount : ${auction.basePrice + INCREMENT}`}
            // }

            // // bid amount greater than the auction.highestBid + INCREMENT
            // if(auction.highestBid != null && auction.highestBid + INCREMENT > bidAmount){
            //     return {status : 400, message : `Minimum bid amount : ${auction.highestBid + INCREMENT}`}
            // }

            // valid bid by buyer 
            // transaction : step add bid to the bid table and update the auction table

            try{
                await sequelize.transaction(async t =>{
                    const bid =await Bid.create(
                        {
                            bidAmount : bidAmount ,
                            buyerId : buyerId ,
                            auctionId : auctionId ,
                        },
                        {transaction : t}
                    )

                    await Auction.update({
                        highestBid : bidAmount ,
                        highestBidder : buyerId 
                        },{
                            transaction : t ,
                            where : {
                                auctionId : auctionId
                            }
                        }
                    )
                })

                

                // put the message into the queue
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

                return {status : 200 , message : "Bid placed Successfuly"}
            }catch(err){
                console.log("Error in placing a bid : " , err) ;
                return {status : 500 , message : "Bid not placed"}
            }
    }

static async placeBid2({ auctionId, buyerId, bidAmount }) {
  try {
    const auction = await AuctionService.fetchAuctionByIdInternal(auctionId);
    if (!auction) {
      return { status: 400, message: "Auction not found!" };
    }

    if (auction.status !== "live") {
      return { status: 400, message: "Auction is not live!" };
    }

    const minBid = Math.max(auction.basePrice, auction.highestBid || 0) + INCREMENT;
    if (bidAmount < minBid) {
      return { status: 400, message: `Minimum bid amount: ${minBid}` };
    }

    await sendBid({ auctionId, buyerId, bidAmount });
    return { status: 200, message: "Your bid has been queued!" };

  } catch (err) {
    console.error("Error in placeBid2:", err);
    return { status: 500, message: "Internal Server Error" };
  }
}




    
}



module.exports = BiddingService;