import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./contexts/CartContext";
import CartModal from "./Components/Cart"
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <CartProvider>{children}
      <CartModal />
      </CartProvider>
        </body>
    </html>
  );
}
