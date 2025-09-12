import pool from "../../db.js";

async function getAllLive(req, res) {
  try {
    let {
      page,
      limit,
      cropType,
      qualityGrade,
      shelfLife,
      location,
      sortBy,
      quantityMin,
      quantityMax,
      priceMin,
      priceMax,
      immediateDelivery
    } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    const queryParams = [];
    const filters = [];

    // Apply filters
    if (cropType) {
      queryParams.push(`%${cropType}%`);
      filters.push(`c.crop_name ILIKE $${queryParams.length}`);
    }

    if (qualityGrade) {
      queryParams.push(qualityGrade);
      filters.push(`c.quality_grade = $${queryParams.length}`);
    }

    if (shelfLife) {
      queryParams.push(shelfLife);
      filters.push(`c.shelf_life = $${queryParams.length}`);
    }

    if (location) {
      queryParams.push(`%${location}%`);
      filters.push(`c.crop_location ILIKE $${queryParams.length}`);
    }

    if (quantityMin) {
      queryParams.push(Number(quantityMin));
      filters.push(`c.quantity >= $${queryParams.length}`);
    }

    if (quantityMax) {
      queryParams.push(Number(quantityMax));
      filters.push(`c.quantity <= $${queryParams.length}`);
    }

    if (priceMin) {
      queryParams.push(Number(priceMin));
      filters.push(`a.base_price >= $${queryParams.length}`);
    }

    if (priceMax) {
      queryParams.push(Number(priceMax));
      filters.push(`a.base_price <= $${queryParams.length}`);
    }

    // if (immediateDelivery === "true") {
    //   filters.push(`c.immediate_delivery = true`);
    // }

    const filterQuery = filters.length > 0 ? " AND " + filters.join(" AND ") : "";

    // Sort options
    const sortOptions = {
      "price_asc": "a.base_price ASC",
      "price_desc": "a.base_price DESC",
      "date_asc": "a.start_time ASC",
      "date_desc": "a.start_time DESC",
      "bid_asc": "a.highest_bid ASC",
      "bid_desc": "a.highest_bid DESC"
    };

    const orderByClause = sortOptions[sortBy] || "a.start_time DESC";

    let query = `
      SELECT a.id AS auction_id, 
             c.crop_name, 
             c.quantity, 
             c.quality_grade,
             c.shelf_life,
             c.crop_location,
             a.base_price, 
             a.highest_bid, 
             u1.name AS highest_bidder, 
             a.start_time, 
             a.end_time, 
             a.created_at, 
             u2.name AS farmer_name
      FROM auctions a
      JOIN crops c ON a.crop_id = c.id
      JOIN users u2 ON c.farmer_id = u2.id
      LEFT JOIN users u1 ON a.highest_bidder = u1.id
      WHERE a.status = 'open' ${filterQuery}
      ORDER BY ${orderByClause}
      LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2};
    `;

    queryParams.push(limit, offset);

    const result = await pool.query(query, queryParams);

    res.json({
      page,
      limit,
      filters: req.query,
      auctions: result.rows
    });

    console.log("Fetched live auctions with filters");

  } catch (error) {
    console.error("Error fetching filtered auctions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default getAllLive;
