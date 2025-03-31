const CartService = require("../services/cartService");
const CartRepository = require("../repositories/cartRepository");

// Mock CartRepository
jest.mock("../repositories/cartRepository");

describe("CartService", () => {

    beforeEach(() => {
        jest.clearAllMocks(); // Reset mocks before each test
    });

    test("should return 'Cart Full' when max quantity is reached", async () => {
        const mockProductCartInfo = [{ quantity: 5, productDetails: { quantity: 5 } }];
        CartRepository.getProductCartInfo.mockResolvedValue(mockProductCartInfo);

        const itemData = { productId: "123", quantity: 1 };
        const result = await CartService.addItemToCart(itemData);

        expect(result).toBe("Cart Full");
        expect(CartRepository.addItem).not.toHaveBeenCalled(); // Ensure item is NOT added
    });

    test("should remove item from cart", async () => {
        CartRepository.removeItem.mockResolvedValue();
        CartRepository.getCartItems.mockResolvedValue([]);

        const result = await CartService.removeItemFromCart("123");

        expect(CartRepository.removeItem).toHaveBeenCalledWith("123");
        expect(CartRepository.getCartItems).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    test("should return cart items with correct properties", async () => {
        const mockCartItems = [
            {
                _id: "1",
                productId: "123",
                quantity: 2,
                productDetails: { image: "img.jpg", name: "Product", price: 10, quantity: 5 }
            }
        ];
        CartRepository.getCartItems.mockResolvedValue(mockCartItems);

        const result = await CartService.getCartItems();

        expect(CartRepository.getCartItems).toHaveBeenCalled();
        expect(result).toEqual([
            {
                _id: "1",
                productId: "123",
                quantity: 2,
                image: "img.jpg",
                name: "Product",
                price: 10,
                maxQuantity: 5
            }
        ]);
    });

    test("should update item quantity in cart", async () => {
        const mockItem = { _id: "1", productId: "123", quantity: 2 };
        CartRepository.findOneItem.mockResolvedValue(mockItem);
        CartRepository.updateItem.mockResolvedValue();
        CartRepository.getCartItems.mockResolvedValue([]);

        const result = await CartService.updateCartItem("123", 3);

        expect(CartRepository.findOneItem).toHaveBeenCalledWith("123");
        expect(CartRepository.updateItem).toHaveBeenCalledWith("123", 5); // 2 + 3 = 5
        expect(CartRepository.getCartItems).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});
