import pool from "../../db.js";
async function approveCrop(req,res) {
    try {
        const { crop_id, base_price, start_time, end_time } = req.body;

        if (!crop_id || !base_price || !start_time || !end_time) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const currentTime = new Date();
        if (new Date(start_time) <= currentTime) {
            return res.status(400).json({ error: "Start time must be greater than the current time" });
        }

        if (new Date(end_time) <= new Date(start_time)) {
            return res.status(400).json({ error: "End time must be greater than start time" });
        }

        // Start transaction
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            // Check if the crop exists & is pending
            const crop = await client.query(
                "SELECT * FROM crops WHERE id = $1 AND status = 'pending'",
                [crop_id]
            );

            if (crop.rows.length === 0) {
                await client.query("ROLLBACK");
                return res.status(404).json({ error: "Crop not found or already listed" });
            }

            // Insert new auction
            const auctionResult = await client.query(
                `INSERT INTO auctions (crop_id, base_price, start_time, end_time, status, highest_bid, highest_bidder, created_at)
                 VALUES ($1, $2, $3, $4, 'not started', 0, NULL, NOW()) 
                 RETURNING id`,
                [crop_id, base_price, start_time, end_time]
            );

            const auction_id = auctionResult.rows[0].id;

            // Update crop status to 'listed'
            await client.query(
                "UPDATE crops SET status = 'listed' WHERE id = $1",
                [crop_id]
            );

            // Commit transaction
            await client.query("COMMIT");
            client.release();

            return res.status(200).json({
                message: "Crop approved & auction created successfully",
                auction_id: auction_id,
            });

        } catch (error) {
            await client.query("ROLLBACK");
            client.release();
            console.error("Transaction failed:", error);
            return res.status(500).json({ error: "Server error" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default approveCrop;