const CartService = require("../services/cartService");

const CartController = {
  async addItem(req, res) {
    try {
      const newItem = await CartService.addItemToCart(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  },

  async removeItem(req, res) {
    try {
      await CartService.removeItemFromCart(req.params.id);
      res.status(200).json({ message: "Item removed" });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove item from cart" });
    }
  },

  async getCart(req, res) {
    try {
      const cartItems = await CartService.getCartItems();
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
    }
  },

  async updateItem(req, res) {
    try {
      const newItem = await CartService.updateCartItem(req.params.productId,req.body);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart" });
    }
  },
};

module.exports = CartController;
