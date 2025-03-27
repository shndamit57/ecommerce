const ProductItem = require("../models/productModel");

const ProductRepository = {
  async getProductItems() {
    return ProductItem.find();
  },
};

module.exports = ProductRepository;
