const mongoose = require("mongoose");

const ProductItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  image: { type: String, required: true },
});

module.exports = mongoose.model("ProductItem", ProductItemSchema);
