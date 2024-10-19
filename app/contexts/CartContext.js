"use client"; // Ensure this is a client component
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize state from local storage if available
    if (typeof window !== 'undefined') { // Check if window is defined (browser context)
      const savedCartItems = localStorage.getItem('cartItems');
      return savedCartItems ? JSON.parse(savedCartItems) : [];
    }
    return []; // Default to an empty array if not in the browser
  });

  const [cartVisible, setCartVisible] = useState(false);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, item];
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Save to local storage
      }
      return updatedItems;
    });
  };

  const removeFromCart = (donationId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== donationId); // Filter out the item with the matching ID
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update local storage
      }
      return updatedItems; // Return the updated items
    });
  };
  const removeAllFromCart = () => {
    setCartItems([]); // Clear the cart items
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify([])); // Update local storage
    }
  };
  const clearCart = () => {
    setCartItems([]); // Clear cart in state
    localStorage.setItem("cart", JSON.stringify([])); // Clear local storage as well
  };

  const closeCart = () => {
    setCartVisible(false);
  };

  useEffect(() => {
    setCartVisible(cartItems.length > 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart,clearCart, removeFromCart, removeAllFromCart, closeCart, cartVisible }}>
      {children}
    </CartContext.Provider>
  );
};
