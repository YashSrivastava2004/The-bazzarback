const CreateNewItem = require("../models/CreateItem");
const User = require("../models/User");

async function addNewProduct(req, res) {
  try {
    //note : - how this exports
    const SellerId = req.user._id;
    const productId = req.body.productId;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const discount = req.body.discount;
    const discountedPrice = req.body.discountedPrice;
    const imageSrc = req.body.image.src;

    const sellerDetails = await User.findById(SellerId);
    if (!sellerDetails) {
      console.log("Seller Id is:", SellerId);
      return res.status(404).json({
        success: false,
        msg: "Seller not found",
      });
    }

    const createNewProduct = await CreateNewItem.create({
      seller: sellerDetails._id,
      productId: productId,
      title: title,
      description: description,
      price: price,
      discount: discount,
      discountedPrice: discountedPrice,
      image: imageSrc,
    });

    const productDetails = await CreateNewItem.findById(createNewProduct._id);
    //note:-go  into deep in this syntax
    await User.findByIdAndUpdate(
      {
        _id: sellerDetails._id,
      },
      {
        $push: {
          productsOnSale: createNewProduct,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      msg: "Product added successfully in seller id",
      data: createNewProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "Server error failed to add item in cart",
    });
  }
}

module.exports = {
  addNewProduct,
};
