const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");

const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({
      success: false,
      message: "NO Order Found!",
    });
  } else {
    const order = await Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      createdOrder,
    });
  }
});

module.exports = { addOrderItem };
