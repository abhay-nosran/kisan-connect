const biddingService = require('../../services/BiddingServices/BiddingService');
// req is post with body containing {auctionId, buyerId, bidAmount}
async function placeBid (req,res) {
    const {auctionId , buyerId , bidAmount} = req.body;
    
    if(!auctionId || !buyerId || !bidAmount) {
        return res.status(400).send("Missing required fields");
    }

    try{
        await biddingService.placeBid({auctionId, buyerId, bidAmount});
        return res.status(200).send("Bid placed successfully");
    }catch(err){
        return res.status(500).send(err.message);
    }

}