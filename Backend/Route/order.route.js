import express from "express";
const router = express.Router();
import { addOrderItems, getAllOrders, getMyOrder, getOrderById, markOrderAsDelivered, updateOrderToPaid } from "../Controller/order.controller.js";
import  {protect, admin } from "../Middleware/auth.middleware.js";

// POST /api/order
router.route("/").post(protect, addOrderItems).get(protect,admin,getAllOrders);
router.route("/mine").get(protect,getMyOrder);
router.route("/:id").get(protect, getOrderById);

//new route for payment
router.route("/:id/pay").put(protect,updateOrderToPaid);
router.route("/:id/deliver").put(protect,markOrderAsDelivered);

export default router;