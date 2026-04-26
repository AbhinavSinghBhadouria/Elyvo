import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";


export const protectionRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            // FIXED: Changed req.auth() to req.auth.userId
            const clerkId = req.auth.userId;
            
            if (!clerkId) {
                return res.status(401).json({ msg: "Unauthorized - invalid token" });
            }

            // Find user in DB by clerk Id
            const user = await User.findOne({ clerkId });
            
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            req.user = user;
            next();
        }
        catch (error) {
            console.error("Error in protectionRoute Middleware", error);
            res.status(500).json({ msg: "Internal Server Error" });
        }
    }
];

export const adminAuth = (req, res, next) => {
    const adminSecret = req.headers['x-admin-secret'];
    const clerkId = req.auth?.userId;
    
    const allowedIds = ENV.ADMIN_IDS.split(',').map(id => id.trim());
    
    const isSecretValid = adminSecret && adminSecret === ENV.ADMIN_SECRET;
    const isIdValid = clerkId && allowedIds.includes(clerkId);

    if (!isSecretValid && !isIdValid) {
        return res.status(401).json({ msg: "Unauthorized - Access Restricted to Admins" });
    }
    next();
};