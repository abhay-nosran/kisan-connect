import pool from "../../db.js";
async function getAllCrops(req,res) {
    try {
          const { farmerId } = req.params;
    
          const query = "SELECT * FROM crops WHERE farmer_id = $1;";
          const result = await pool.query(query, [farmerId]);
    
          res.json({
              farmer_id: farmerId,
              crops: result.rows
          });
    
      } catch (error) {
          console.error("Error fetching crops for farmer:", error);
          res.status(500).json({ error: "Internal Server Error" });
      }
}

export default getAllCrops ;