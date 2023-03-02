const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controller/productController");

const router = express.Router();

// ROUTE FOR ALL PRODUCTS
router.route("/products").get(getAllProducts);

// ROUTE FOR SINGLE PRODUCT
router.route("/product/:id").get(getProductById);

module.exports = router;
