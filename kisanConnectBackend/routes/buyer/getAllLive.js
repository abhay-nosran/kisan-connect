import pool from "../../db.js";

async function getAllLive(req, res) {
    try {
        let { page, limit, crop, sort } = req.query;
    
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
    
        let queryParams = [];
        let filterQuery = "";

        // Filtering based on crop name
        if (crop) {
            queryParams.push(`%${crop}%`);
            filterQuery = ` AND c.crop_name ILIKE $${queryParams.length}`;
        }

        let query = `
          SELECT a.id AS auction_id, 
                 c.crop_name AS crop_name, 
                 c.quantity, 
                 a.base_price, 
                 a.highest_bid, 
                 u1.name AS highest_bidder, 
                 a.start_time, 
                 a.end_time, 
                 a.created_at, 
                 u2.name AS farmer_name
          FROM auctions a
          JOIN crops c ON a.crop_id = c.id
          JOIN users u2 ON c.farmer_id = u2.id -- Fetching farmer's name
          LEFT JOIN users u1 ON a.highest_bidder = u1.id -- Fetching highest bidder's name
          WHERE a.status = 'open' ${filterQuery}
        `;

        // Sorting logic
        const sortOptions = {
            "price_asc": "a.base_price ASC",
            "price_desc": "a.base_price DESC",
            "date_asc": "a.start_time ASC",
            "date_desc": "a.start_time DESC", // Default
            "bid_asc": "a.highest_bid ASC",
            "bid_desc": "a.highest_bid DESC"
        };

        query += ` ORDER BY ${sortOptions[sort] || "a.start_time DESC"}`;

        // Pagination
        queryParams.push(limit, offset);
        query += ` LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length};`;

        const result = await pool.query(query, queryParams);

        res.json({
            page,
            limit,
            crop: crop || "All",
            sort: sort || "date_desc",
            auctions: result.rows
        });

        // console.log("Executing Query:", query, queryParams);

    } catch (error) {
        console.error("Error fetching live auctions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default getAllLive;
