// components/PaymentSystem.js
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSystem() {
  const searchParams = useSearchParams();
  const queryAmount = searchParams.get("amount"); // Access the query parameter

  const [amount, setAmount] = useState(""); // State to store amount
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (queryAmount) {
      setAmount(queryAmount); // Set amount from query params
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [queryAmount]);

  const payNow = async () => {
    if (!amount || !name || !email){
      return alert("Please fill all the details");
    } 

    try {
      // Create order by calling the server endpoint
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: "receipt#1",
          user: name,  // Send name as 'user'
          email, 
          notes: {},
        }),
      });

      const order = await response.json();

      // Open Razorpay Checkout
      const options = {
        key: "rzp_test_zqg3xz1NG64BqS", // Test key
        amount: order.amount,
        currency: order.currency,
        name: "ISCKON Wavcity",
        description: "Test Transaction",
        order_id: order.id, // This is the order_id created in the backend
        callback_url: "/api/verify", // Your success URL
        prefill: {
          name,  // User's name
          email, // User's email
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: function (response) {
          fetch("/api/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "ok") {
                // Redirect to the success page with only the order_id as a query parameter
                window.location.href = `/status?order_id=${response.razorpay_order_id}`;
              } else {
                alert("Payment verification failed");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error verifying payment");
            });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating order");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Razorpay Payment Gateway Integration
      </h1>
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm"
        onSubmit={(e) => {
          e.preventDefault();
          payNow();
        }}
      >
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2 mb-4"
        />
        
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2 mb-4"
        />

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount:
          </label>
          <span className="text-lg font-semibold text-gray-800">₹ {amount}</span>
        </div> 
         
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}
