const express = require("express");
const CartController = require("../controllers/cartController");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.post("/cart", CartController.addItem);
router.post("/cart/:productId", CartController.updateItem);
router.delete("/cart/:id", CartController.removeItem);
router.get("/cart", CartController.getCart);
router.get("/products", ProductController.getProduct);

module.exports = router;
