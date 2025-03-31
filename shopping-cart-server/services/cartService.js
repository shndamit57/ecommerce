const CartRepository = require("../repositories/cartRepository");

const CartService = {
  async addItemToCart(itemData) {
    let productCartInfo = await CartRepository.getProductCartInfo(itemData.productId);
    if (productCartInfo[0]?.quantity >= productCartInfo[0]?.productDetails?.quantity) {
      return 'Cart Full'
    }
    await CartRepository.addItem(itemData);
    return this.getCartItems();
  },

  async removeItemFromCart(productId) {
    await CartRepository.removeItem(productId);
    return this.getCartItems();
  },

  async getCartItems() {
    let cartItems = await CartRepository.getCartItems();
    cartItems = cartItems.map(item => {
      return {
        _id: item._id,
        productId: item.productId,
        quantity: item.quantity,
        image: item.productDetails.image,
        name: item.productDetails.name,
        price: item.productDetails.price,
        maxQuantity: item.productDetails.quantity
      }
    })
    return cartItems
  },

  async updateCartItem(productId, quantity) {
    let item = await CartRepository.findOneItem(productId);
    quantity += item.quantity;
    await CartRepository.updateItem(productId, quantity);
    return this.getCartItems();
  },
};

module.exports = CartService;
