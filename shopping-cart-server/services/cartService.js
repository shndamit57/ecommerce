const CartRepository = require("../repositories/cartRepository");

const CartService = {
  async addItemToCart(itemData) {
    return CartRepository.addItem(itemData);
  },

  async removeItemFromCart(productId) {
    return CartRepository.removeItem(productId);
  },

  async getCartItems() {
    return CartRepository.getCartItems();
  },

  async updateCartItem(productId,itemData) {
    let item = await CartRepository.findOneItem(productId);
    itemData.quantity += item.quantity
    return CartRepository.updateItem(productId,itemData);
  },
};

module.exports = CartService;
