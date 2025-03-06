import pool from "../../db.js";
async function getPendingCrops(req,res) {
    try {
        const result = await pool.query(
            "SELECT * FROM crops WHERE status = 'pending'"
        );
  
        return res.status(200).json({
            message: "Pending crops retrieved successfully",
            crops: result.rows,
        });
    } catch (error) {
        console.error("Error fetching pending crops:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export default getPendingCrops ;