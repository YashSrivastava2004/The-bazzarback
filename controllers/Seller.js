const User = require("../models/User");

async function getMyProducts(req, res) {
  try {
    //get the seller
    const seller = await User.findById(req.user._id).populate({
      path: "productsOnSale",
      model: "CreateNewItem",
    });

    if (!seller || seller.length === 0) {
      return res.status(403).json({
        success: false,
        msg: "No products found",
      });
    }

    //aur response mein bhej do
    return res.status(200).json({
      success: true,
      msg: "all products fethched successfully",
      seller,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error error cannot get the products",
    });
  }
}

module.exports = {
  getMyProducts,
};
