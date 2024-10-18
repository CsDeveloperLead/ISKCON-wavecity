// "use client";
// import { useState } from 'react';
// import Script from 'next/script';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';

// function Payment() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [amount, setAmount] = useState('0');
//   const [currency, setCurrency] = useState('INR');
//   const [loading, setLoading] = useState(false);

//   const createOrderId = async () => {
//     try {
//       const response = await fetch('/api/order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: parseFloat(amount) * 100,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       return data.orderId;
//     } catch (error) {
//       console.error('There was a problem with your fetch operation:', error);
//     }
//   };

//   const processPayment = async (e) => {
//     e.preventDefault();
//     try {
//       const orderId = await createOrderId();

     
//       const options = {
//         key: "rzp_test_1DP5mmOlF5G5ag", // Access your public Razorpay key from env
//         amount: parseFloat(amount) * 100,
//         currency: currency,
//         name: 'name',
//         description: 'description',
//         order_id: orderId,
//         handler: async function (response) {
//           const data = {
//             orderCreationId: orderId,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//           };

//           const result = await fetch('/api/verify', {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: { 'Content-Type': 'application/json' },
//           });

//           const res = await result.json();
//           if (res.isOk) {
//             alert("Payment succeeded");
//           } else {
//             alert(res.message);
//           }
//         },
//         prefill: {
//           name: name,
//           email: email,
//         },
//         theme: {
//           color: '#3399cc',
//         },
//       };

//       const paymentObject = new window.Razorpay(options);
//       paymentObject.on('payment.failed', function (response) {
//         alert(response.error.description);
//       });
//       paymentObject.open();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Script
//         id="razorpay-checkout-js"
//         src="https://checkout.razorpay.com/v1/checkout.js"
//       />

// <section className="min-h-[94vh] flex flex-col gap-6 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center justify-center pt-36">
//   <form
//     className="flex flex-col gap-6 w-full sm:w-80 bg-white p-6 rounded-lg shadow-lg"
//     onSubmit={processPayment}
//   >
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">Full Name</label>
//       <input
//         type="text"
//         required
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         placeholder="Enter your full name"
//       />
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">Email</label>
//       <input
//         type="email"
//         placeholder="user@gmail.com"
//         required
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         placeholder="Enter your email"
//       />
//     </div>

//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">Amount</label>
//       <input
//         type="number"
//         step="1"
//         min={5}
//         required
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         placeholder="Enter amount (min 5)"
//       />
//     </div>

//     <button
//       type="submit"
//       className="w-full py-2 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//     >
//       Pay
//     </button>
//   </form>
// </section>

//     </>
//   );
// }

// export default Payment;
"use client";
import { useState, useEffect } from "react";

export default function PaymentSystem() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Dynamically load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script if the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const payNow = async () => {
    if (!amount || !name || !email) return alert("Please fill all the details");

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
        
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2 mb-4"
        />
        
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
