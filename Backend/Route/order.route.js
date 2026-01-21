import express from "express";
const router = express.Router();
import { addOrderItems } from "../Controller/order.controller.js";
import protect from "../Middleware/auth.middleware.js";

// POST /api/order
router.route("/").post(protect, addOrderItems);

export default router;