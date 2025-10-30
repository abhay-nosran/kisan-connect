const  {Auction , Crop , Bid , sequelize, Farmer} = require('../../database/models/relationships');
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

static async fetchAuctionByIdInternal(auctionId){ // to be used internally will resolve in future
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
// to fetch a particular auction
 static async fetchAuctionById(auctionId) {
    try {
        const auction = await Auction.findByPk(auctionId, {
            include: [
                {
                    model: Crop,
                    attributes: ["cropType", "quantityKg", "qualityGrade", "certification"],
                    include: [
                        {
                            model: Farmer,
                            attributes: ["location"], // only necessary fields
                        }
                    ]
                }
            ]
        });

        if (!auction) {
            return {
                success: 0,
                status: 404,
                message: `Auction not found with id: ${auctionId}`,
            };
        }

        return {
            success: 1,
            status: 200,
            auction,
        };

    } catch (err) {
        console.error("Error in fetching Auction:", err); // log for debugging, not user response
        return {
            success: 0,
            status: 500,
            message: "Internal Server Error",
            error: err.message, // optional: expose only message, not full error
        };
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

    static async getWonAuctionsBuyer(buyerId) {
    try {
        const auctions = await Auction.findAll({
            where: {
                status: "closed",
                highestBidder: buyerId
            },
            include: [
                {
                    model: Crop,
                    attributes: ["cropType", "quantityKg", "qualityGrade", "certification"]
                }
            ]
        });

        return auctions; // just return data
    } catch (err) {
        throw err; // let controller decide how to handle it
    }
}

}

module.exports = AuctionService ;




 