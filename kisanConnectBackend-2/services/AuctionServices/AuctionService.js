
class AuctionService {
    // filters have page , limit , qualityGrade , location , isLive

    // to fetch all auction 
    static async fetchAuctions(filters) {
        const {page , limit , qualityGrade , location , isLive} = filters ;

        // 
    }

    // to fetch a particular auction by auctionId
    static async fetchAuctionById(autionId){

    }

    // to fetch all auction on which a buyer has placed a bid 
    static async fetchAuctionByBuyerId(buyerId,filters){
        
    }
}

module.exports = {AuctionService} ;