import pool from "../../db.js";
async function getAuction(req,res) {
    try {
        const { id } = req.params;
        
        // Fetch auction details from database
        const query = "SELECT * FROM auctions WHERE id = $1";
        const result = await pool.query(query, [id]);
    
        // If auction not found
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "Auction not found" });
        }
    
        res.json(result.rows[0]);
      } catch (error) {
        console.error("Error fetching auction details:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

export default getAuction 