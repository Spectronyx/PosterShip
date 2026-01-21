import expressAsyncHandler from "express-async-handler";
import User from "../Model/user.model.js";
import jwt from "jsonwebtoken"

const protect = expressAsyncHandler(async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    
    console.log("DEBUG 1: Raw Token from Header:", token ? "Token Received" : "NULL");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DEBUG 2: Decoded ID from JWT:", decoded.id);

        const foundUser = await User.findById(decoded.id).select("-password");
        console.log("DEBUG 3: User found in DB?:", foundUser ? "YES" : "NO");

        if (!foundUser) {
            res.status(401);
            throw new Error("User ID in token does not exist in DB");
        }

        req.user = foundUser;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
});

export default protect;