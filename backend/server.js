const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const products = require("./data/products");
const connectDB = require("./config/config");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

// dotenv config
dotenv.config();
// Connecting to mongoDB Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors()); // CROSS ORIGIN API CALLS

app.get("/", (req, res) => {
  res.send("<h1>Welcome to node server.</h1>");
});

// Connect Routes
app.use(productRoutes); // PRODUCT ROUTE
app.use(userRoutes); // USER ROUTE
app.use(orderRoutes); // ORDER ROUTE
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(
    `Server runnig in ${process.env.NODE_ENV} mode on PORT ${process.env.PORT}`
  );
});
