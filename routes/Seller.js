const express = require("express");
const router = express.Router();
const { auth, isSeller } = require("../middleware/auth");
const { addNewProduct } = require("../controllers/Cart");
const { getMyProducts } = require("../controllers/Seller");

router.post("/addNewProduct", auth, isSeller, addNewProduct);
router.get("/getMyProduct", auth, isSeller, getMyProducts);

module.exports = router;
