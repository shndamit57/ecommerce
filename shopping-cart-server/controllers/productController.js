const ProductService = require("../services/productService");

const ProductController = {
  async getProduct(req, res) {
    try {
      const productItems = await ProductService.getProductItems();
      console.log(productItems);
      res.status(200).json(productItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product items" });
    }
  },
};

module.exports = ProductController;
