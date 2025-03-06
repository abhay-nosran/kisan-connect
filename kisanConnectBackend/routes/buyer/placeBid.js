import pool from "../../db.js";

async function placeBid(req,res) {
    const { auctionId } = req.params;
    const { buyer_id, bid_amount } = req.body;
    console.log(buyer_id)

    if (!buyer_id || !bid_amount || bid_amount <= 0) {
        return res.status(400).json({ error: "Invalid buyer ID or bid amount" });
    }

    try {
        const client = await pool.connect();

        // Check if auction exists and fetch details
        const auctionResult = await client.query(
            "SELECT base_price, highest_bid , status FROM auctions WHERE id = $1",
            [auctionId]
        );

        if (auctionResult.rows.length === 0) {
            client.release();
            return res.status(404).json({ error: "Auction not found" });
        }

        const { base_price, highest_bid, status } = auctionResult.rows[0];
        if (status !== 'open') {
            client.release();
            return res.status(400).json({ error: "Auction is closed for bidding" });
        }

        // Validate bid amount
        if (bid_amount <= base_price) {
            client.release();
            return res.status(400).json({ error: `Your bid must be greater than ₹${base_price}` });
        }

        if (highest_bid !== null && bid_amount <= highest_bid) {
            client.release();
            return res.status(400).json({ error: `Your bid must be greater than ₹${highest_bid}` });
        }

        // Insert new bid into bid table
        const bidInsertQuery = `
            INSERT INTO bids (auction_id, buyer_id, bid_amount, created_at)
            VALUES ($1, $2, $3, NOW()) RETURNING *;
        `;
        const bidResult = await client.query(bidInsertQuery, [auctionId, buyer_id, bid_amount]);

        // Update the highest bid in auction table
        await client.query(
            "UPDATE auctions SET highest_bid = $1, highest_bidder = $2 WHERE id = $3",
            [bid_amount, buyer_id, auctionId]
        );
        client.release();

        res.status(201).json({
            message: "Bid placed successfully",
            bid: bidResult.rows[0]
        });

    } catch (err) {
        console.error("Error placing bid:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default placeBid ;