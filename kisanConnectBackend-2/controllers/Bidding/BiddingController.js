const BiddingService = require('../../services/BiddingService/BiddingService');


class BiddingController {

    constructor(){
        throw new Error("Can't Insitalize BiddingController static class !")
    }

    // req is post with body containing {auctionId, buyerId, bidAmount}
    static async  placeBid (req,res) {
        let {auctionId , bidAmount} = req.body;
        let buyerId = req.decoded.roleId ;
        if(!auctionId || !buyerId || !bidAmount) {
            return res.status(400).send({message : "Missing required fields"});
        }

        auctionId = parseInt(auctionId)
        buyerId = parseInt(buyerId)
        bidAmount = parseInt(bidAmount)
        try{    
            
            const response = await BiddingService.placeBid({auctionId, buyerId, bidAmount});
            const status = response.status ;
            delete response.status ;
            return res.status(status).send(response);
        }catch(err){
            return res.status(500).send(err.message);
        }
    }

}

module.exports = BiddingController 