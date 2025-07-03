const User = require("../models/User");
const axios = require("axios");

async function getAllProducts(req, res) {
  try {
    const externalProductsResponse = await axios.get(
      "https://fakestoreapi.com/products"
    );
    const externalProducts = externalProductsResponse.data;

    const allSellers = await User.find({ userType: "Seller" }).populate(
      "productsOnSale"
    );

    let allProducts = [];
    allSellers.forEach((seller) => {
      allProducts = [...allProducts, ...seller.productsOnSale];
    });
    allProducts = [...allProducts, ...externalProducts];

    res.json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllProducts,
};
