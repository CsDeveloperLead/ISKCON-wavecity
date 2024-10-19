"use client";
import { usePathname } from "next/navigation";
import CartModal from "./Components/Cart";

export default function ClientLayout({ children }) { 
  const pathname = usePathname(); // Get the current pathname

  // Check if the route is either "/payment" or "/status"
  const shouldShowCartModal = pathname !== "/payment" && pathname !== "/status" && pathname !== "/status?=order_id=";

  return (
    <>
      {children}
      {shouldShowCartModal && <CartModal />} {/* Conditionally render CartModal */}
    </>
  );
}
