import cron from "node-cron";
import pool from "../db.js"; // Your database connection

// Runs every minute to update auction statuses
cron.schedule("*/1 * * * *", async () => {
    console.log("Running auction status update job...");

    try {
        // Open auctions when start_time is reached
        await pool.query(`
            UPDATE auctions 
            SET status = 'open' 
            WHERE status = 'not started' AND start_time <= NOW();
        `);

        // Close auctions when end_time is reached
        await pool.query(`
            UPDATE auctions 
            SET status = 'closed' 
            WHERE status = 'open' AND end_time <= NOW();
        `);

        console.log("Auction statuses updated successfully.");
    } catch (error) {
        console.error("Error updating auction statuses:", error);
    }
});

export default cron;
