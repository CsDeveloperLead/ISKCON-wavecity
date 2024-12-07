"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import Link from "next/link";

const CartModal = () => {
  const { cartItems, clearCart } = useCart();
  const [totalCount, setTotalCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Count total items in the cart
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setTotalCount(count);

    // Calculate total amount
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white py-8 shadow-md transition-transform duration-300 ease-in-out ${
        totalCount > 0 ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="w-full px-20">
        {totalCount > 0 ? (
          <ul className="mt-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <span className="flex flex-col">
                  <span className="text-gray-700 font-semibold">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                </span>
                <span className="text-gray-700 font-semibold">
                  ₹{item.price * item.quantity}
                </span>
              </li>
            ))}
            <li className="flex justify-between items-center mt-4">
              <span className="font-semibold text-lg">
                Total Amount: ₹{totalAmount}
              </span>
              <div className="flex gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    clearCart();
                  }}
                >
                  Clear Cart
                </button>
                <Link
                  href={{
                    pathname: "/payment",
                    query: { amount: totalAmount }, // Pass totalAmount as a query parameter
                  }}
                >
                  <div className="text-white bg-main rounded-lg w-[150px] py-3 flex justify-center items-center cursor-pointer">
                    Pay Now
                  </div>
                </Link>
              </div>
            </li>
          </ul>
        ) : (
          <div className="mt-4">Your cart is empty.</div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
