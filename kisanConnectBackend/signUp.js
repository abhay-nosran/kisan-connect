// import  pool  from "./db.js";
// import bcrypt from "bcryptjs";
// async function signUp(req,res){
//     try {
//         const { name, email, phone, password, role, company_name, location } = req.body;

//         if (!name || !email || !phone || !password || !role) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert user into 'users' table
//         const result = await pool.query(
//             "INSERT INTO users (name, email, phone, password_hash, role, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id",
//             [name, email, phone, hashedPassword, role]
//         );

//         const userId = result.rows[0].id;

//         // Insert into role-specific table
//         if (role === "buyer" && company_name) {
//             await pool.query("INSERT INTO buyers (user_id, company_name) VALUES ($1, $2)", [userId, company_name]);
//         } else if (role === "farmer" && location) {
//             await pool.query("INSERT INTO farmers (user_id, location) VALUES ($1, $2)", [userId, location]);
//         }

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         console.error("Error registering user:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// export default signUp ;

import pool from "./db.js";
import bcrypt from "bcryptjs";

async function signUp(req, res) {
    try {
        const { name, email, phone, password, role, company_name, location } = req.body;

        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into 'users' table
        const userResult = await pool.query(
            "INSERT INTO users (name, email, phone, password_hash, role, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id",
            [name, email, phone, hashedPassword, role]
        );

        const userId = userResult.rows[0].id;
        let roleId = null;

        // Insert into role-specific table and retrieve role_id
        if (role === "buyer" && company_name) {
            const buyerResult = await pool.query(
                "INSERT INTO buyers (user_id, company_name) VALUES ($1, $2) RETURNING id",
                [userId, company_name]
            );
            roleId = buyerResult.rows[0].id;
        } else if (role === "farmer" && location) {
            const farmerResult = await pool.query(
                "INSERT INTO farmers (user_id, location) VALUES ($1, $2) RETURNING id",
                [userId, location]
            );
            roleId = farmerResult.rows[0].id;
        }

        // Update role_id in users table if applicable
        if (roleId) {
            await pool.query(
                "UPDATE users SET role_id = $1 WHERE id = $2",
                [roleId, userId]
            );
        }

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default signUp;
