const express = require("express");
const CartController = require("../controllers/cartController");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.post("/cart", CartController.addItem);
router.patch("/cart/increment/:productId", CartController.incrementItem);
router.patch("/cart/decrement/:productId", CartController.decrementItem);
router.delete("/cart/:productId", CartController.removeItem);
router.get("/cart", CartController.getCart);
router.get("/products", ProductController.getProduct);

module.exports = router;
