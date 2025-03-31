import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <div className="app">
        <h1>Shopping Cart</h1>
        <button className="cart-toggle" onClick={toggleCart}>🛒 View Cart</button>
        <ProductList />
        <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
        <div className={`overlay ${isCartOpen ? "active" : ""}`} onClick={toggleCart}></div>
      </div>
    </CartProvider>
  );
}

export default App;
