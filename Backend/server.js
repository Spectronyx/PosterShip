import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Configs/db.js";
import posterRoute from "./Route/poster.route.js";
import userRoute from "./Route/user.route.js";
import orderRoute from "./Route/order.route.js"; // Import the ROUTE, not the controller
import { errorMiddleware } from "./Middleware/error.middleware.js";

dotenv.config();
connectDB();

const app = Express();

// 1. Global Middleware
app.use(cors());
app.use(Express.json()); // Only need this once
app.use(Express.urlencoded({ extended: true }));

// 2. Routes
app.use("/api/poster", posterRoute);
app.use("/api/users", userRoute);

// FIX: Use the orderRoute file which contains: router.route("/").post(protect, addOrderItems)
app.use("/api/order", orderRoute); 

// 3. Error Handling (Must be after routes)
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});