const AuctionService = require('../../services/AuctionServices/AuctionService');

class AuctionController {

  constructor(){
    throw new error("can't create object of a static AuctionContoller Class") 
  }
  // 🔹 GET all auctions (for admin/representative view)
  static async getAuctionAll(req, res) {
    const filters = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      qualityGrades: req.query.qualityGrades !== undefined ? JSON.parse(req.query.qualityGrades) : null,
      // locations: req.query.locations !== undefined ? JSON.parse(req.query.locations) : null,
      isLive: req.query.isLive !== undefined ? Boolean(JSON.parse(req.query.isLive)) : null,
      minQuantity : Number(req.query.minQuantity) || null ,
      maxQuantity : Number(req.query.maxQuantity) || null 
    };

    try {
      const auctions = await AuctionService.fetchAuctions(filters);
      return res.status(200).json(auctions);
    } catch (err) {
      if(err.name === "Bad_Request"){
        return res.status(400).json({error : err.message}) ;
      }
      return res.status(500).json({ error: err.message });
    }
  }

  static async getAuctionById(req, res) {
    const auctionId = req.params.auctionId ;
    if(!auctionId){
      return res.status(400).json({ error: "auctionId is required in params" });
    }
    try {
        const auction = await AuctionService.fetchAuctionById(auctionId);
        return res.status(200).json(auction);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

  }
  // 🔹 GET auctions for a buyer
  static async getAuctionBuyer(req, res) {
    const filters = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      qualityGrade: req.query.qualityGrade || null,
      location: req.query.location || null,
      isLive: req.query.isLive || null ,
    };
    const buyerId = req.decoded.roleId ;

    if(!buyerId){
      return res.status(400).json({ error: "buyerId is missing !" });
    }
    try {
      const auction = await AuctionService.fetchAuctionByBuyerId(filters,buyerId);
      return res.status(200).json(auction);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  

}

module.exports = AuctionController;
