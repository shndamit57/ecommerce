const ProductRepository = require("../repositories/productRepository");

const ProductService = {
  async getProductItems() {
    return ProductRepository.getProductItems();
  },
};

module.exports = ProductService;
