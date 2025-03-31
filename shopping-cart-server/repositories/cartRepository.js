const CartItem = require("../models/cartModel");
const mongoose = require("mongoose");

const CartRepository = {
  async findOneItem(productId) {
    const existingItem = await CartItem.findOne({ productId: productId });
    return existingItem;
  },

  async addItem(itemData) {
    const existingItem = await CartItem.findOne({ productId: itemData.productId });
    if (existingItem) {
      existingItem.quantity += 1;
      return existingItem.save();
    }
    const newCartItem = {
      productId: itemData.productId,
      quantity: 1
    }
    return CartItem.create(newCartItem);
  },

  async removeItem(productId) {
    return CartItem.findOneAndDelete({ productId });
  },

  async updateItem(productId, quantity) {
    return CartItem.updateOne({ productId }, { $set: { quantity } });
  },

  async getProductCartInfo(productId) {
    return CartItem.aggregate([
      {
        $match: { productId: new mongoose.Types.ObjectId(productId) }
      },
      {
        $lookup: {
          from: "productitems", // MongoDB collection name
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Converts array to a single object
      },
    ]).exec();;
  },

  async getCartItems() {
    return CartItem.aggregate([
      {
        $lookup: {
          from: "productitems", // MongoDB collection name
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Converts array to a single object
      },
    ]).exec();;
  },
};

module.exports = CartRepository;
