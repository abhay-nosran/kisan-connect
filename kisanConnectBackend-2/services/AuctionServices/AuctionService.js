const  {Auction , Crop , Bid , sequelize} = require('../../database/models/relationships');
const {Op} = require("sequelize")

class AuctionService {
    
    // to fetch all auction {filters have page , limit , qualityGrade , location , isLive}
static async fetchAuctions(filters) {
    const { page, limit, qualityGrades, locations, isLive, minQuantity, maxQuantity } = filters;

    console.log(filters) ;

    const whereClause = {};
   
    if (isLive !== null) {
        whereClause.status = isLive ? "live" : "closed";
    }

    const offset = (page - 1) * limit;

    // Build where condition for Crop in the include
    const cropWhere = {};
    
    if (minQuantity !== null && maxQuantity !== null) {
        if(minQuantity > maxQuantity){
            let error = new Error("maxQuantity should be greater than minQuantity");
            error.name = "Bad_Request" ;
            throw error ;
        }
        cropWhere.quantityKg = { [Op.between]: [minQuantity, maxQuantity] };
    } else if (minQuantity !== null) {
        cropWhere.quantityKg = { [Op.gte]: minQuantity };
    } else if (maxQuantity !== null) {
        cropWhere.quantityKg = { [Op.lte]: maxQuantity };
    }

    if (qualityGrades && qualityGrades.length > 0) {
        cropWhere.qualityGrade = { [Op.in]: qualityGrades };
    }
    if (locations && locations.length > 0) {
        cropWhere.location = { [Op.in]: locations };
    }
    try {
        let auctions = await Auction.findAndCountAll({
            where: whereClause,
            limit: limit,
            offset: offset,
            include: [
                {
                    model: Crop,
                    required: true,
                    attributes: ["cropType", "quantityKg", "qualityGrade"],
                    where: Object.keys(cropWhere).length ? cropWhere : undefined
                }
            ]
        });

        return auctions.rows;
    } catch (err) {
        throw new Error("Error fetching auctions: " + err.message);
    }
}


    // to fetch a particular auction by auctionId
    static async fetchAuctionById(auctionId){
        try {
            const auction = await Auction.findByPk(auctionId) ;
            if(!auction){
                const err = new Error("Auction not found with id: " + auctionId);
                err.name = "AuctionIdInValid" ;
                throw err ;
            }
            return auction  ;
        }catch(err){

            if(err.name !== "AuctionIdInValid"){
                console.log("Error in fetching Auction : ",err) ;
            }
            throw err
        }
    }

    // to fetch all auction on which a buyer has placed a bid 
    static async fetchAuctionByBuyerId(filters,buyerId){
        const {page , limit , qualityGrade , location , isLive} = filters ;
        
            const whereClause = {buyer_Id : buyerId} ;
            if(qualityGrade){
                whereClause.qualityGrade = qualityGrade ;
            }
            if(location){
                whereClause.location = location ;
            }
            if(isLive !== null){
                whereClause.status = isLive ? 'live' : 'closed' ;
            }

            const offset = (page - 1) * limit ;
        const auctions = await Auction.findAll({
            attributes: [
            'auctionId',
            'basePrice',
            'startTime',
            'endTime',
            'status',
            'highestBid',
            'highestBidder',
            // MAX(bid_amount) as buyer_highest_bid
            [sequelize.fn('MAX', sequelize.col('Bids.bid_amount')), 'buyer_highest_bid'],
            // CASE WHEN highest_bidder = buyerId THEN 'Winning' ELSE 'OutBid' END as bid_status
            [
                sequelize.literal(`CASE 
                    WHEN "Auction"."highest_bidder" = ${buyerId} THEN 'Winning' 
                    ELSE 'OutBid' 
                END`),
                'bid_status'
            ]
            ],
            include: [
            {
                model: Bid,
                attributes: [], // we only want aggregate data
                where: whereClause // filter bids of this buyer
            }
            ],
            group: [
            'Auction.auctionId',
            'Auction.basePrice',
            'Auction.startTime',
            'Auction.endTime',
            'Auction.status',
            'Auction.highestBid',
            'Auction.highestBidder'
            ]
        });

        return auctions;
    }
}

module.exports = AuctionService ;




 