const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
// const db = require("./database");
const db = require("./config/database")
const cartRoutes = require("./routes/ViewCart");
const userRoutes = require("./routes/user");
const registerRoutes = require("./routes/Registering");
const sellerRoutes = require("./routes/Seller");
const adminRoutes = require("./routes/Admin");
const productRoutes = require("./routes/Products");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactUsRoutes = require("./routes/contactUs");

// Load env variables first
dotenv.config();

// Connect to MongoDB
db.connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/files", express.static("files"));

// API Routes
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/contact", contactUsRoutes);
app.use("/api/v1/seller", sellerRoutes);
app.use("/api/v1/register", registerRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/product", productRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
