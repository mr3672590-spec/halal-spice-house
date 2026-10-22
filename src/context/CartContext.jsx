
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        return previousCart.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...previousCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => String(item.id) !== String(productId)
      )
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((previousCart) =>
      previousCart.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
