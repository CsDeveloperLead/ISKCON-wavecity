// import Razorpay from 'razorpay';
// import { NextResponse } from 'next/server';

// // Initialize Razorpay with environment variables
// const razorpay = new Razorpay({
//   key_id: "rzp_test_1DP5mmOlF5G5ag",
//   key_secret: "TpqNrmU3Bwv6UptBYZspKqBn",
// });



// export async function POST(request) {
//   try {
//     // Parse the request body to get the amount and currency
//     const { amount, currency } = await request.json();

//     // Ensure that amount and currency are provided
//     if (!amount || !currency) {
//       return NextResponse.json({ message: "Amount and currency are required" }, { status: 400 });
//     }

//     // Set up the Razorpay order options
//     const options = {
//       amount: (parseFloat(amount) * 100).toString(), // Convert to paise
//       currency,
//       receipt: 'rcp1',
//     };

//     // Create the Razorpay order
//     const order = await razorpay.orders.create(options);
//     console.log("Order created: ", order);

//     // Return the order ID to the client
//     return NextResponse.json({ orderId: order.id }, { status: 200 });
//   } catch (error) {
//     console.error("Error creating Razorpay order: ", error);
//     return NextResponse.json({ message: "Error creating order" }, { status: 500 });
//   }
// }

import Razorpay from "razorpay";
import fs from "fs";
import path from "path";

const razorpay = new Razorpay({
  key_id: "rzp_test_zqg3xz1NG64BqS", // Replace with your actual key_id
  key_secret: "E02raLgDxVLJjcUyQ6wSks4j", // Replace with your actual key_secret
});

const ordersFilePath = path.resolve(process.cwd(), "orders.json");

// Function to read existing orders data from the file
const readData = () => {
  if (fs.existsSync(ordersFilePath)) {
    const data = fs.readFileSync(ordersFilePath);
    return JSON.parse(data);
  }
  return [];
};

// Function to write updated orders data back to the file
const writeData = (data) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req) {
  try {
    // Extract the data from the incoming request
    const { amount, currency, receipt, notes, user, email } = await req.json();

    // Log the incoming user and email data to ensure they're passed correctly
    console.log("User:", user);
    console.log("Email:", email);

    const options = {
      amount: parseInt(amount) * 100, // Convert to smallest currency unit (paise for INR)
      currency,
      receipt,
      notes,
    };

    // Log the options object for debugging
    console.log("Order options:", options);
    
    // Create an order using Razorpay
    const order = await razorpay.orders.create(options);

    // Read existing orders from the JSON file
    const orders = readData();

    // Log the current orders for debugging
    console.log("Current orders:", orders);

    // Add the new order with user and email information
    const newOrder = {
      order_id: order.id,
      user,  // Add user name
      email, // Add user email
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      date : new Date().toISOString(),
      status: "created",
    };

    // Log the new order for debugging
    console.log("New order to be added:", newOrder);

    // Push the new order into the orders array
    orders.push(newOrder);

    // Write the updated orders to the JSON file
    writeData(orders);

    // Respond with the created order details
    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return new Response(JSON.stringify({ message: "Error creating order" }), { status: 500 });
  }
}


