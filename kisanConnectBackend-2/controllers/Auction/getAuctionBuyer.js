const {} = require('../../services/AuctionServices/AuctionService')

const {getAuctionBuyerService} = require('../../services/AuctionServices/getAuctionBuyerService')
async function getAuctionBuyerController(req, res) {

    const filters = {
        page : req.page || 1 ,
        limit : req.limit || 10 ,
        qualityGrade : req.qualityGrade || null ,
        location : req.location || null ,
        isLive : req.isLive || null 
    }

    try{
        const auction = await getAuctionBuyerService(filters) ;
        return res.status(200).json(auction) ;
    }catch(err){
        return res.status(500).json({error: err.message}) ;
    }
}