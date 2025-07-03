const express=require("express");
const AuthController = require("../controllers/Auth"); 
const router=express.Router();



router.post("/signup",AuthController.Signup)
router.post("/login",AuthController.Login)

module.exports=router