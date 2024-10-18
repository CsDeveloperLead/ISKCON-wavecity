// // /pages/api/verify.js
// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       // Extract order_id, payment_id, and signature from the request body
//       const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//       if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//         return res.status(400).json({ success: false, message: 'Missing parameters' });
//       }

//       // Combine order_id and payment_id for signature validation
//       const generatedSignature = razorpay_order_id + '|' + razorpay_payment_id;

//       // Normally, you'd verify the signature here using a Razorpay library or custom validation
//       // Simulating signature validation for this example:
//       const isValidSignature = razorpay_signature === 'some_valid_signature'; // Replace with actual validation logic

//       if (isValidSignature) {
//         // If signature is valid, return success
//         return res.status(200).json({ success: true, message: 'Payment verified successfully' });
//       } else {
//         // If signature is invalid, return failure
//         return res.status(400).json({ success: false, message: 'Invalid signature' });
//       }
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//       return res.status(500).json({ success: false, message: 'Server error' });
//     }
//   } else {
//     // Return 405 Method Not Allowed for non-POST requests
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
//   }
// }

import Razorpay from "razorpay";
import fs from "fs";
import path from "path";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

const razorpay = new Razorpay({
  key_id: "rzp_test_zqg3xz1NG64BqS",
  key_secret: "E02raLgDxVLJjcUyQ6wSks4j",
});

const ordersFilePath = path.resolve(process.cwd(), "orders.json");

const readData = () => {
  if (fs.existsSync(ordersFilePath)) {
    const data = fs.readFileSync(ordersFilePath);
    return JSON.parse(data);
  }
  return [];
};

const writeData = (data) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
  const secret = razorpay.key_secret;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);
    if (isValidSignature) {
      const orders = readData();
      const order = orders.find((o) => o.order_id === razorpay_order_id);
      if (order) {
        order.status = "paid";
        order.payment_id = razorpay_payment_id;
        writeData(orders);
      }
      console.log("Payment verification successful");
      return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
    } else {
      console.log("Payment verification failed");
      return new Response(JSON.stringify({ status: "verification_failed" }), { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: "error", message: "Error verifying payment" }), { status: 500 });
  }
}
