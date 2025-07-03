const express = require("express");
const router = express.Router();
const viewCartController = require("../controllers/ViewCart");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// router.post("/createcart", upload.single('image'), viewCartController.createCartItems);
router.post("/createcart",viewCartController.createCartItems);
router.get("/getAllCartItems", viewCartController.getAllCartItems);
router.delete("/deleteCartItem",viewCartController.deleteCartItem)

module.exports = router;
