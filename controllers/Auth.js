const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

async function Signup(req, res) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.userType;

    if (!name || !email || !password) {
      res.status(404).json({
        status: "false",
        msg: "All input fields are required",
      });
    }

    const findEmail = await User.findOne({
      email: email,
    });
    if (findEmail) {
      return res.status(409).json({
        status: "false",
        msg: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      userType: userType,
    });
    res.status(200).json({
      status: "true",
      msg: "User signed up successfull",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server error failed to signup",
    });
  }
}

async function Login(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(404).json({
        status: "false",
        msg: "All input fields are required",
      });
    }

    const userLogin = await User.findOne({
      email: email,
    });
    console.log("User login", JSON.stringify(userLogin._id));
    console.log("User login", userLogin.email);
    if (!userLogin) {
      return res.status(404).json({
        status: "false",
        msg: "User is not yet signed up",
      });
    }

    const pass = await bcrypt.compare(password, userLogin.password);

    if (pass) {
      const token = jwt.sign(
        {
          _id: userLogin._id.toString(),
          email: userLogin.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      // console.log(userLogin.id);
      userLogin.token = token;
      userLogin.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        status: "true",
        msg: "User login successfull",
        userLogin,
      });
    } else {
      return res.status(401).json({
        status: "false",
        msg: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server Error cannot login the user",
    });
  }
}

module.exports = { Signup, Login };
