"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

const CartModal = () => {
  const { cartItems} = useCart();
  const [totalCount, setTotalCount] = useState(0); // Local state for total count
  const [groupedItemsArray, setGroupedItemsArray] = useState([]); // Local state for grouped items

  useEffect(() => {
    // Count total items in the cart
    const count = cartItems.length;
    setTotalCount(count);

    // Group items by title
    const groupedItems = cartItems.reduce((acc, item) => {
      if (!acc[item.title]) {
        acc[item.title] = { ...item, count: 1 }; // Initialize with count 1
      } else {
        acc[item.title].count += 1; // Increment count if item already exists
      }
      return acc;
    }, {});
    
    setGroupedItemsArray(Object.values(groupedItems)); // Convert to array for rendering
  }, [cartItems]); // Dependency array to re-run when cartItems change

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white py-8 shadow-md transition-transform duration-300 ease-in-out ${
        totalCount > 0 ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="w-full px-20">
        <div className="flex justify-between items-center">
          {/* <h2 className="text-lg font-bold">Your Cart</h2> */}
        </div>

        {/* Cart Items */}
        {totalCount > 0 ? (
          <ul className="mt-4">
            <li className="flex justify-between items-center mb-2">
              <span className="flex flex-col gap-1">
                <span className="text-gray-600 font-semibold text-base">
                  Donating For
                </span>
                <span>
                  {groupedItemsArray[0].title}{" "}
                  {totalCount > 1 && `+ ${totalCount - 1} more`}
                </span>
              </span>
              <span className="flex items-center gap-10">
                <div className="flex flex-col items-start gap-2">
                  <span className="font-semibold text-gray-600">
                    Total Amount: ₹
                    <span className="text-lg text-main font-bold">
                      {" "}
                      {cartItems.reduce((acc, item) => acc + item.price, 0)}
                    </span>
                  </span>
                </div>
                <div className="text-white bg-main rounded-lg w-[150px] py-3 flex justify-center items-center cursor-pointer">
                  Pay Now
                </div>
              </span>
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
