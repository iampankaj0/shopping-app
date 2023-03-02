const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

// GET ALL PRODUCTS
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET SINGLE PRODUCT BY ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({
      message: "Product Not Found",
    });
  }
});

module.exports = { getAllProducts, getProductById };
