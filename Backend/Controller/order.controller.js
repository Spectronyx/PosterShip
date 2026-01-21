import Order from "../Model/order.model.js";
import mongoose from "mongoose";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        //throwing the error in own error class
        throw new ApiError(404,"cannot find the order");
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
        // the own response class
        new ApiResponse(201,createdOrder);
    }
});


export const getOrderById = asyncHandler(async (req,res) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if(order){
        // res.json(order);
        new ApiResponse(200,order)
    }else{
        // res.status(404);
        // throw new Error("cannot find the order");

        throw new ApiError(404,"cannot find the order");
    }
});

// @desc    Get logged in user orders
// @route   GET /api/order/myorders
// @access  Private

export const getMyOrder = asyncHandler(async (req,res) => {
    if(!req.user){
        throw new ApiError(401,"you are nto authorised fro this task");
        
    }
    const orders = await Order.find({user: req.user._id}).sort({createdAt: -1})

    // res.json(orders);
    ApiResponse(200,orders)
});

// @desc    Get all orders
// @route   GET /api/order
// @access  Private/Admin

export const getAllOrders = asyncHandler(async (req,res) => {
    const orders = await Order.find({}).populate("user","id name");

    if(!orders){
        // res.json(404);
        // throw new Error("cannot fetch all the orders")
        throw new ApiError(404, "cannot fetch all the orders");
    }else{
        // res.json(orders)
        new ApiResponse(200,orders);
    }
});

// @desc Update order to paid
// @route Put /api/order/:id/pay
// @access admin

export const updateOrderToPaid = asyncHandler(async (req,res) => {
    const order = await Order.findById(req.params.id);
    
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        console.log(req.body);

        //These details comes form the payment gateway usually
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer?.email_address,
        };

        const updatedOrder = await order.save();
        // res.json(updatedOrder);
        new ApiResponse(200,updatedOrder);
    }else{
        // res.status(404);
        // throw new Error("order cannot be found")

        throw new ApiError(404, "order cannot be found")
    }    
});


// @desc    Update order to delivered
// @route   PUT /api/order/:id/deliver
// @access  Private

export const markOrderAsDelivered = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        // res.status(404);
        // throw new Error("Order not found");
        throw new ApiError(404,"order cannot be found");
    }else{
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        // res.status(200);
        // res.json(updatedOrder);
        throw new ApiResponse(200, updateOrder);
    }
});