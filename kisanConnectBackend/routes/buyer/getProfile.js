import pool from "../../db.js";

async function getProfile(req, res) {
    try {
        
        const buyerId = req.params.buyerId; // Extract buyerId

        const result = await pool.query(
            `SELECT 
                users.id AS user_id,
                users.name,
                users.email,
                users.phone,
                users.role,
                buyers.id AS buyer_id,
                buyers.company_name
             FROM buyers
             JOIN users ON buyers.user_id = users.id
             WHERE buyers.id = $1 AND users.role = 'buyer'`,
            [buyerId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No buyer found with the given ID." });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching buyer details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default getProfile;
