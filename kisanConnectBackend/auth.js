import jwt from "jsonwebtoken";
import "dotenv/config";

// Middleware to verify JWT token
export const authenticate = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid token." });
    }
};

// Middleware to restrict access based on roles
export const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access forbidden: Unauthorized role" });
    }
    next();
};
