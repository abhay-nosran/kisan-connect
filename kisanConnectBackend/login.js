// import pool from "./db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// async function login(req,res) {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ error: "Email and password are required" });
//         }

//         const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

//         if (result.rows.length === 0) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }

//         const user = result.rows[0];
//         const isMatch = await bcrypt.compare(password, user.password_hash);

//         if (!isMatch) {
//             return res.status(401).json({ error: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         console.error("Error logging in:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// export default login;
import pool from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ 
            message: "Login successful", 
            token, 
            role_id: user.role_id // Include role_id in response
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default login;
