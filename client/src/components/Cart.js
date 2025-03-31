import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = ({ isOpen, toggleCart }) => {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={toggleCart}>×</button>
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? <p>Cart is empty</p> : (
                <>
                    {cart.map((item) => (
                        <div key={item.productId} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h4>{item.name}</h4>
                                <p>${item.price} x {item.quantity}</p>
                                <button onClick={() => incrementQuantity(item)}>+</button>
                                <button onClick={() => decrementQuantity(item)}>-</button>
                                <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <h3>Total: ${totalPrice}</h3>
                </>
            )}
        </div>
    );
};

export default Cart;
