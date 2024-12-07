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
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false); // Control cart visibility

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart)); // Parse and set cart items
    }
  }, []);

  useEffect(() => {
    if (order_id) {
      const matchedOrder = orders.find((order) => order.order_id === order_id);
      if (matchedOrder) {
        setOrderDetails(matchedOrder); // Set the order details if found
      } else {
        console.log("Order not found");
      }
    }
  }, [order_id]);

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Title Styling
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 123, 255); // Blue color
    doc.text("Receipt", 105, 20, { align: "center" });
  
    // Line under the title
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
  
    // Company/Receipt Header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 40, 40);
    doc.text("Iskcon Wavecity, Ghaziabad", 20, 35);
    doc.setFont("helvetica", "normal");
    doc.text("Iskconwavecity@gmail.com", 20, 40);
    doc.text("Date: " + formatDate(orderDetails.date), 160, 40, {
      align: "right",
    });
  
    // Order Details Box
    doc.setFont("helvetica", "bold");
    doc.text("Order Information", 20, 50);
    doc.setFont("helvetica", "normal");
    doc.rect(20, 55, 170, 40);
    doc.text(`Order ID: ${orderDetails.order_id}`, 25, 60);
    doc.text(`Name: ${orderDetails.user}`, 25, 70);
    doc.text(`Email: ${orderDetails.email}`, 25, 80);
    doc.text(`Date: ${formatDate(orderDetails.date)}`, 25, 90);
  
    // Cart Items
    doc.setFont("helvetica", "bold");
    doc.text("Cart Items", 20, 110);
    doc.setFont("helvetica", "normal");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let y = 120; // Initial position for cart items
  
    cartItems.forEach((item, index) => {
      const itemText = `${index + 1}. ${item.name} - Qty: ${item.quantity} - Price: ${item.price}Rs.`;
      if (y > 270) {
        // Add a new page if the text goes beyond the page height
        doc.addPage();
        y = 20; // Reset y for the new page
      }
      doc.text(itemText, 20, y);
      y += 7; // Move down for the next item
    });
  
    // Payment Details Box
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", 20, y + 10);
    doc.setFont("helvetica", "normal");
    doc.rect(20, y + 15, 170, 40);
    doc.text(`Amount: ${(orderDetails.amount / 100).toFixed(2)}Rs.`, 25, y + 20);
    doc.text(`Currency: ${orderDetails.currency}`, 25, y + 30);
    doc.text(`Payment ID: ${orderDetails.payment_id || "N/A"}`, 25, y + 40);
    doc.text(`Status: ${orderDetails.status}`, 25, y + 50);
  
    // Footer Message
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 123, 255); // Blue color
    doc.text(
      "Thank you for your Shopping and your Generous Donations!",
      105,
      y + 70,
      { align: "center" }
    );
  
    // Save the PDF
    doc.save(`Iskcon_Wavecity_${orderDetails.order_id}.pdf`);
  };
  

  if (!orderDetails) {
    return <p>Loading...</p>; // Show loading state while fetching data
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>
        <p className="text-gray-700 mb-6">Thank you for your payment!</p>

        {/* Payment Information */}
        <div className="border-t border-gray-300 pt-4 mt-4">
          <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
          <ul className="text-gray-600 flex flex-col">
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
              <strong>Date:</strong> {formatDate(orderDetails.date)}
            </li>
            <li>
              <strong>Amount:</strong> ₹{(orderDetails.amount / 100).toFixed(2)}
            </li>
            <li>
              <strong>Currency:</strong> {orderDetails.currency}
            </li>
            <li>
              <strong>Payment ID:</strong> {orderDetails.payment_id || "N/A"}
            </li>
            <div className="my-6">
              <h1 className="text-lg font-semibold mb-2 text-black">Particulars : </h1>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4"
                  >
                    <h3 className="font-bold">{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))
              )}
            </div>
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
          <button
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            onClick={() => {localStorage.removeItem("cartItems"); window.location.reload();window.location.href = "/";}}
          >
            Go to Homepage
          </button>
        </div>
      </div>
      {/* Conditionally Render Cart */}
      {showCart && (
        <div>
          <Cart />
        </div>
      )}
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
