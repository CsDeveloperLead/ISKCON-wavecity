"use client"; // Ensure this component is treated as a client component
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from "react";
import orders from "../../orders.json";

// Define a Loading component to handle the Suspense fallback
const Loading = () => {
  return <p>Loading...</p>;
};

const PaymentSuccessComponent = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id'); // Get the order_id from query params
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (order_id) {
      // Find the order that matches the order_id
      const matchedOrder = orders.find(order => order.order_id === order_id);
      if (matchedOrder) {
        setOrderDetails(matchedOrder); // Set the order details if found
      } else {
        console.error("Order not found for ID:", order_id);
      }
    }
  }, [order_id]); // Add order_id to the dependency array

  console.log("Order ID: ", order_id);

  if (!orderDetails) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-700 mb-6">Thank you for your payment!</p>

        {/* Payment Information */}
        <div className="border-t border-gray-300 pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
          <ul className="text-gray-600">
            <li>
              <strong>Order ID:</strong> {orderDetails.order_id}
            </li>
            <li>
              <strong>Amount:</strong> ₹{(orderDetails.amount / 100).toFixed(2)}
            </li>{" "}
            {/* Convert from paise to INR */}
            <li>
              <strong>Currency:</strong> {orderDetails.currency}
            </li>
            <li>
              <strong>Payment ID:</strong> {orderDetails.payment_id || "N/A"}
            </li>
            <li>
              <strong>Status:</strong> {orderDetails.status}
            </li>
          </ul>
        </div>

        {/* Download Receipt Button */}
        <button
          onClick={() =>
            window.open(`/api/receipt?order_id=${orderDetails.order_id}`, "_blank")
          }
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Download Receipt
        </button>
      </div>
    </div>
  );
};

// Wrap the component with Suspense
export default function PaymentSuccess() {
  return (
    <Suspense fallback={<Loading />}>
      <PaymentSuccessComponent />
    </Suspense>
  );
}
