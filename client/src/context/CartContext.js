import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Fetch Cart Data from API on Load
    useEffect(() => {
        fetch("http://localhost:5000/api/cart")
            .then((res) => res.json())
            .then((data) => setCart(data))
            .catch((error) => console.error("Error fetching cart:", error));
    }, []);

    // Add to Cart (API call)
    const addToCart = async (product) => {
        try {
            const res = await fetch("http://localhost:5000/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id }),
            });
            const data = await res.json();
            if(data === 'Cart Full') {
                alert('Max Product limit reached')
            } else {
                setCart(data);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    // Remove from Cart (API call)
    const removeFromCart = async (productId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            setCart(data);
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    // Increment Quantity
    const incrementQuantity = async (item) => {
        try {
            if(item.quantity >= item.maxQuantity) {
                alert('Max limit reached');
            } else {
                const res = await fetch(`http://localhost:5000/api/cart/increment/${item.productId}`, {
                    method: "PATCH",
                });
                const data = await res.json();
                setCart(data);    
            }
        } catch (error) {
            console.error("Error incrementing quantity:", error);
        }
    };

    // Decrement Quantity
    const decrementQuantity = async (item) => {
        try {
            if(item.quantity <= 0) {
                alert('Cannot go below 0');
            } else {
                const res = await fetch(`http://localhost:5000/api/cart/decrement/${item.productId}`, {
                    method: "PATCH",
                });
                const data = await res.json();
                setCart(data);    
            }
        } catch (error) {
            console.error("Error decrementing quantity:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
