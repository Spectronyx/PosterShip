import expressAsyncHandler from "express-async-handler";
import Order from "../Model/order.model.js";
import mongoose from "mongoose";

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


export const getOrderById = expressAsyncHandler(async (req,res) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(order){
        res.json(order);
    }else{
        res.status(404);
        throw new Error("cannot find the order");
    }
});

// @desc    Get logged in user orders
// @route   GET /api/order/myorders
// @access  Private

export const getMyOrder = expressAsyncHandler(async (req,res) => {
    if(!req.user){
        throw new Error("you are nto authorised fro this task");
    }
    const orders = await Order.find({user: req.user._id}).sort({createdAt: -1})

    res.json(orders);
});