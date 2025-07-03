const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { getAllSellers } = require("../controllers/Admin");

router.get("/getAllSellers", getAllSellers);

module.exports = router;
