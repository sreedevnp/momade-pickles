import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
  const existing = cart.find(
    (item) => item.name === product.name
  );

  if (existing) {
    setCart(
      cart.map((item) =>
        item.name === product.name
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  } else {
    setCart([
      ...cart,
      {
        ...product,
        quantity: 1,
      },
    ]);
  }
};


  const increaseQuantity = (name) => {
    setCart(
      cart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setCart(
      cart
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (name) => {
    setCart(
      cart.filter(
        (item) => item.name !== name
      )
    );
  };

  const clearCart = () => {
  setCart([]);
};

  return (
    <CartContext.Provider
  value={{
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  }}
    >

      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);