const AuctionService = require('../../services/AuctionServices/AuctionService');

class AuctionController {
  // 🔹 GET all auctions (for admin/representative view)
  async getAuctionAll(req, res) {
    const filters = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      qualityGrade: req.query.qualityGrade || null,
      location: req.query.location || null,
      isLive: req.query.isLive || null
    };

    try {
      const auctions = await AuctionService.fetchAuctions(filters);
      return res.status(200).json(auction);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getAuctionById(req, res) {
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
  async getAuctionBuyer(req, res) {
    const filters = {
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      qualityGrade: req.query.qualityGrade || null,
      location: req.query.location || null,
      isLive: req.query.isLive || null ,
    };
    const buyerId = req.params.buyerId ;

    if(!buyerId){
      return res.status(400).json({ error: "buyerId is required in params" });
    }
    try {
      const auction = await AuctionService.fetchAuctionByBuyerId(filters,buyerId);
      return res.status(200).json(auction);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  

}

module.exports = new AuctionController();
