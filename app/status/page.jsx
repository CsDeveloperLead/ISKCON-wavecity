"use client"; // Ensure this component is treated as a client component
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import orders from "../../orders.json";
import Cart from "../Components/Cart";
import jsPDF from "jspdf"; 


// Define a Loading component to handle the Suspense fallback
const Loading = () => {
  
  return <p>Loading...</p>;
};

// Helper function to format date and time
const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Get the date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Get the time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, "0") : "12"; // the hour '0' should be '12'

  // Return formatted date and time
  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
};

const PaymentSuccessComponent = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id"); // Get the order_id from query params
  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    if (order_id) {
      // Check if the page has already reloaded once
      const hasReloaded = localStorage.getItem("reloadOnce");
  
      if (!hasReloaded) {
        // Find the order that matches the order_id
        const matchedOrder = orders.find((order) => order.order_id === order_id);
  
        if (matchedOrder) {
          setOrderDetails(matchedOrder); // Set the order details if found
        } else {
          // Clear cart items first
          localStorage.removeItem("cartItems");
          console.log("Cart cleared");
  
          // Set a flag to prevent multiple reloads
          localStorage.setItem("reloadOnce", "true");
  
          // Delay reload to ensure cart items are cleared first
          setTimeout(() => {
            window.location.reload();
          }, 100); // Adjust the delay if needed
        }
      } else {
        // Remove the flag after reload
        localStorage.removeItem("reloadOnce");
      }
    }
  }, [order_id]);
  
   // Add order_id to the dependency array

  console.log("Order ID: ", order_id);

  useEffect(() => {
    // Clear cartItems from localStorage when user lands on /status page
    localStorage.removeItem("cartItems");
  
    console.log("Cart cleared");
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Set up title styling
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 123, 255); // Blue color
    doc.text("Receipt", 105, 20, { align: "center" });

    // Adding a line under the title
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    // General styling for content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 40, 40);

    // Company or Receipt Header
    doc.setFont("helvetica", "bold");
    doc.text("Iskcon Wavecity, Ghaziabad", 20, 40);
    doc.setFont("helvetica", "normal");
    doc.text("Iskconwavecity@gmail.com", 20, 45);
    doc.text("Date: " + formatDate(orderDetails.date), 160, 45, { align: "right" });

    // Order and customer details box
    doc.setFont("helvetica", "bold");
    doc.text("Order Information", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.rect(20, 65, 170, 50); // Draw a rectangle for neatness

    // Order ID, Name, Email, and Date
    doc.text(`Order ID: ${orderDetails.order_id}`, 25, 75);
    doc.text(`Name: ${orderDetails.user}`, 25, 85);
    doc.text(`Email: ${orderDetails.email}`, 25, 95);
    doc.text(`Date: ${formatDate(orderDetails.date)}`, 25, 105);

    // Payment Details box
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", 20, 130);
    doc.setFont("helvetica", "normal");
    doc.rect(20, 135, 170, 45);

    // Amount, Currency, Payment ID, Status
    doc.text(`Amount: ${(orderDetails.amount / 100).toFixed(2)}`, 25, 145);
    doc.text(`Currency: ${orderDetails.currency}`, 25, 155);
    doc.text(`Payment ID: ${orderDetails.payment_id || "N/A"}`, 25, 165);
    doc.text(`Status: ${orderDetails.status}`, 25, 175);

    // Footer or Thank You message
    doc.setFont("helvetica", "bold");
    doc.text("Thank you for your Generous Donations!", 105, 190, { align: "center" });

    // Save the PDF with a styled file name
    doc.save(`Iskcon_Wavecity_${orderDetails.order_id}.pdf`);
};


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
              <strong>Name:</strong> {orderDetails.user}
            </li>
            <li>
              <strong>Email:</strong> {orderDetails.email}
            </li>
            <li>
              <strong>Date:</strong> {formatDate(orderDetails.date)}{" "}
              {/* Use formatted date */}
            </li>
            <li>
              <strong>Amount:</strong> ₹{(orderDetails.amount / 100).toFixed(2)}{" "}
              {/* Convert from paise to INR */}
            </li>
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
        <div className="flex justify-between">
          <button
            onClick={downloadPDF}
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Download Receipt
          </button>

          <button className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
           onClick={() => window.location.href = '/'}
          >
            Go to Homepage
          </button>
        </div>
      </div>
      <div>
        <Cart />
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
