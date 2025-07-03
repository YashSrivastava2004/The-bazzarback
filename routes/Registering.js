const express = require("express");
const { sellerEmail, EmployeeEmail } = require("../controllers/ContactUs");
const router = express.Router();

router.post("/AsSeller", sellerEmail);
router.post("/AsEmployee", EmployeeEmail);

module.exports = router;
