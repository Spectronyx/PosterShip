import expressAsyncHandler from "express-async-handler";
import Order from "../Model/order.model.js";

export const addOrderItems = expressAsyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items provided");
    } else {
        const order = new Order({
            user: req.user._id, // This comes from the 'protect' middleware
            orderItems: orderItems.map((item) => ({
                ...item,
                poster: item.poster,
            })),
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});