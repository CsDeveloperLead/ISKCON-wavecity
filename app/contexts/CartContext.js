"use client"; // Ensure this is a client component
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = localStorage.getItem("cartItems");
      return savedCartItems ? JSON.parse(savedCartItems) : [];
    }
    return [];
  });

  const [cartVisible, setCartVisible] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((cartItem) => cartItem._id === item._id,

    );
  
      let updatedItems;
      if (existingItemIndex !== -1) {
        // Update quantity if the item already exists in the cart
        updatedItems = prevItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add new item to the cart
        updatedItems = [...prevItems, item];
      }
  
      // Update local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      }
  
      return updatedItems;
    });
  };
  
  

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item._id !== itemId); // Use _id instead of id
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      }
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify([]));
    }
  };

  useEffect(() => {
    setCartVisible(cartItems.length > 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, removeFromCart, cartVisible }}>
      {children}
    </CartContext.Provider>
  );
};
