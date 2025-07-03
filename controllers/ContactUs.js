const Employee = require("../models/Employee");
const Seller = require("../models/Seller");
const User = require("../models/User");
const Contact = require("../models/contact");

async function ContactUs(req, res) {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const message = req.body.message;

    if (!firstname || !lastname || !email || !phonenumber || !message) {
      return res.status(403).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const findUser = await User.findOne({
      email: email,
    });
    if (!findUser) {
      return res.status(403).json({
        success: false,
        msg: "Email is not registered",
      });
    }
    const contactdata = await Contact.create({
      firstname,
      lastname,
      email,
      phonenumber,
      message,
    });
    return res.status(200).json({
      success: true,
      msg: "Contact us form successfull",
      contactdata,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server error failed to contact us",
    });
  }
}

async function sellerEmail(req, res) {
  try {
    const email = req.body.email;

    const userData = await Seller.findOne({
      email: email,
    });
    if (userData) {
      return res.status(404).json({
        success: false,
        msg: "This Email has already been registered by a Seller",
      });
    } else {
      const newSeller = await Seller.create({
        email: email,
      });
      return res.status(200).json({
        success: true,
        msg: "Seller email registered sucessfully",
        data: newSeller,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server error failed to save mail",
    });
  }
}
async function EmployeeEmail(req, res) {
  try {
    const email = req.body.email;

    const userData = await Employee.findOne({
      email: email,
    });
    if (userData) {
      return res.status(404).json({
        success: false,
        msg: "This Email has already been registered by a Employee",
      });
    } else {
      const newSeller = await Employee.create({
        email: email,
      });
      return res.status(200).json({
        success: true,
        msg: "Employee email registered sucessfully",
        data: newSeller,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server error failed to save mail",
    });
  }
}

module.exports = { ContactUs, sellerEmail, EmployeeEmail };
