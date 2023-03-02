const express = require("express");
const { addOrderItem } = require("../controller/orderController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// ADD ITEM ROUTE
router.route("/createorder").all(protect, addOrderItem);

module.exports = router;
