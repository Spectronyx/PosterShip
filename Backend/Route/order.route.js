import express from "express";
const router = express.Router();
import { addOrderItems, getMyOrder, getOrderById } from "../Controller/order.controller.js";
import protect from "../Middleware/auth.middleware.js";

// POST /api/order
router.route("/").post(protect, addOrderItems);
router.route("/mine").get(protect,getMyOrder);
router.route("/:id").get(protect, getOrderById);

export default router;