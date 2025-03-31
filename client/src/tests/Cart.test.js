import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../components/Cart"; // Adjust the path if needed
import { CartContext } from "../context/CartContext";

const mockToggleCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockIncrementQuantity = jest.fn();
const mockDecrementQuantity = jest.fn();

const mockCart = [
    {
        productId: "1",
        name: "Test Product",
        price: 100,
        quantity: 2,
        image: "test.jpg",
    },
];

describe("Cart Component", () => {
    test("renders empty cart message when cart is empty", () => {
        render(
            <CartContext.Provider value={{ cart: [], removeFromCart: mockRemoveFromCart }}>
                <Cart isOpen={true} toggleCart={mockToggleCart} />
            </CartContext.Provider>
        );
        expect(screen.getByText(/Cart is empty/i)).toBeInTheDocument();
    });

    test("renders cart items correctly", () => {
        render(
            <CartContext.Provider
                value={{
                    cart: mockCart,
                    removeFromCart: mockRemoveFromCart,
                    incrementQuantity: mockIncrementQuantity,
                    decrementQuantity: mockDecrementQuantity,
                }}
            >
                <Cart isOpen={true} toggleCart={mockToggleCart} />
            </CartContext.Provider>
        );

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("$100 x 2")).toBeInTheDocument();
        expect(screen.getByText("Total: $200")).toBeInTheDocument();
    });

    test("calls incrementQuantity when + button is clicked", () => {
        render(
            <CartContext.Provider
                value={{ cart: mockCart, incrementQuantity: mockIncrementQuantity }}
            >
                <Cart isOpen={true} toggleCart={mockToggleCart} />
            </CartContext.Provider>
        );

        fireEvent.click(screen.getByText("+"));
        expect(mockIncrementQuantity).toHaveBeenCalledWith(mockCart[0]);
    });

    test("calls decrementQuantity when - button is clicked", () => {
        render(
            <CartContext.Provider
                value={{ cart: mockCart, decrementQuantity: mockDecrementQuantity }}
            >
                <Cart isOpen={true} toggleCart={mockToggleCart} />
            </CartContext.Provider>
        );

        fireEvent.click(screen.getByText("-"));
        expect(mockDecrementQuantity).toHaveBeenCalledWith(mockCart[0]);
    });

    test("calls removeFromCart when Remove button is clicked", () => {
        render(
            <CartContext.Provider
                value={{ cart: mockCart, removeFromCart: mockRemoveFromCart }}
            >
                <Cart isOpen={true} toggleCart={mockToggleCart} />
            </CartContext.Provider>
        );

        fireEvent.click(screen.getByText("Remove"));
        expect(mockRemoveFromCart).toHaveBeenCalledWith("1");
    });
});
