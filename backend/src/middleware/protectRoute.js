import { requireAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";
import { upsertStreamUser } from "../lib/stream.js";

export const protectionRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth.userId;

            if (!clerkId) {
                return res.status(401).json({ msg: "Unauthorized - invalid token" });
            }

            // Find user in DB by clerk Id
            let user = await User.findOne({ clerkId });

            // Self-healing: if user not in DB (e.g. local dev without webhooks),
            // fetch from Clerk and auto-provision them.
            if (!user) {
                try {
                    const clerkUser = await clerkClient.users.getUser(clerkId);
                    const email = clerkUser.emailAddresses?.[0]?.emailAddress;
                    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || email || "Anonymous";
                    const profileImage = clerkUser.imageUrl || "";

                    user = await User.create({ clerkId, email, name, profileImage });

                    // Also sync to Stream so video/chat works immediately
                    await upsertStreamUser({ id: clerkId, name, image: profileImage }).catch(() => {});

                    console.log(`✅ Auto-provisioned new user: ${name} (${clerkId})`);
                } catch (provisionError) {
                    console.error("❌ Failed to auto-provision user from Clerk:", provisionError.message);
                    return res.status(404).json({ msg: "User not found and could not be provisioned." });
                }
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