const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwttoken = words[1];

    if (!jwttoken) {
      return res.status(404).json({
        success: false,
        msg: "Token not found",
      });
    }

    try {
      const decodedToken = jwt.verify(jwttoken, process.env.JWT_SECRET);
      console.log("Decoded Token:", decodedToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error("Token Verification Error:", error);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.isSeller = async (req, res, next) => {
  try {
    const userDetails = await User.findOne({
      email: req.user.email,
    });

    if (!userDetails) {
      console.log(userDetails);
      return res.status(401).json({
        success: false,
        msg: "User not found",
      });
    }

    if (userDetails.userType !== "Seller") {
      return res.status(401).json({
        success: false,
        msg: "You are not a seller! This is a protected route for sellers only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error checking user role",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const userType = await User.findOne({
      email: req.user.email,
    });
    if (userType.userType !== "Admin") {
      return res.status(401).json({
        success: false,
        msg: "You are not a Admin! this is protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "User role can't be found",
    });
  }
};

exports.isUser = async (req, res, next) => {
  try {
    const userType = await User.findOne({
      email: req.user.email,
    });
    if (userType.userType !== "User") {
      return res.status(401).json({
        success: false,
        msg: "You are not a User! this is protected route for User only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "User role can't be found",
    });
  }
};
