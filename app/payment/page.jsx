// pages/payment.js
"use client";
import { Suspense } from "react";
import PaymentSystem from "../Components/PaymentSystem"
export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSystem />
    </Suspense>
  );
}
