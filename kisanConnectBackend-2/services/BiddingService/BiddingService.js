
class BiddingService {

    static async placeBid({ auctionId, buyerId, bidAmount }) {
        // bidAmount should be greater than (current highest bid + 100) and also greater than base price
    }
}

module.exports = BiddingService;