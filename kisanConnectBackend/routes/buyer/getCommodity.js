import pool from "../../db.js"

async function getCommodity(req,res){
    try{
        console.log("Fetching commodity details...") ;
        let commodityName = req.params.commodityName ;
        const query = `SELECT 
        a.id AS auction_id,
        a.highest_bid AS current_bid,
        a.end_time,
        c.quantity,
        c.crop_name
        FROM auctions a
        JOIN crops c ON a.crop_id = c.id
        WHERE c.crop_name ILIKE $1 AND a.status = 'open';
        `
        

        const result = await pool.query(query,[commodityName]) ;
        
        // If no auction found  
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Commodity not found" });
        }
        res.json(result) ;
    }catch(error){
        console.error("Error fetching commodity details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default getCommodity ;