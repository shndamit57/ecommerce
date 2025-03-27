const CartItem = require("../models/cartModel");

const CartRepository = {
  async findOneItem(productId) {
    const existingItem = await CartItem.findOne({ productId: itemData.productId });
    return existingItem;
  },

  async addItem(itemData) {
    const existingItem = await CartItem.findOne({ productId: itemData.productId });
    if (existingItem) {
      existingItem.quantity += 1;
      return existingItem.save();
    }
    return CartItem.create(itemData);
  },

  async removeItem(productId) {
    return CartItem.findOneAndDelete({ productId });
  },

  async updateItem(productId,itemData) {
    return CartItem.updateOne({ productId }, {$set: {quantity: itemData.quantity}});
  },

  async getCartItems() {
    return CartItem.find();
  },
};

module.exports = CartRepository;
