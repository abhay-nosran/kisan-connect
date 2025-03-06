import pool from "../../db.js";
async function addCrop(req,res) {
    try {
        const { farmer_id, crop_name, quantity , certification } = req.body;
  
        // Validate input
        if (!farmer_id || !crop_name || !quantity  || !certification)  {
            return res.status(400).json({ error: "All fields are required" });
        }
  
        const query = `
            INSERT INTO crops (farmer_id, crop_name, quantity,certification ,status, created_at)
            VALUES ($1, $2, $3, $4,  'pending', NOW())
            RETURNING *;
        `;
  
        const result = await pool.query(query, [farmer_id, crop_name, quantity,certification ]);
  
        res.status(201).json({
            message: "Crop submitted successfully",
            crop: result.rows[0]
        });
  
    } catch (error) {
        console.error("Error submitting crop form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default addCrop 