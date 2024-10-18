import { Plus_Jakarta_Sans } from "next/font/google";
import MainNavbar from "./Components/MainNavbar";
import Footer from "./Components/Footer";
import ExploreVrindavan from "./Components/Explore";
import Banner from "./Components/Banner";
import ServiceCarousel from "./Components/ServiceCarousel";
import DonateUs from "./Components/DonateUs";
import Image from "next/image";
import { CartProvider } from './contexts/CartContext';
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"], // Customize weights as needed
  style: ["normal", "italic"], // Optional, for italic styles
  display: "swap", // Control font display behavior
});

export default function Home() {
  return (
    <CartProvider>
    <div className={jakarta.className}>
      <div className="bg-[#f9f9fd]">
        <div className="mx-28">
          <MainNavbar />
          <div className="w-full h-[500px] py-2">
            <Image
              src="/images/ceremony.jpg"
              alt="hero"
              width={1000}
              height={1000}
              className="w-full h-full rounded-3xl"
            />
          </div>
          <div>
            <ExploreVrindavan />
          </div>
          <div className="w-full h-[500px] py-2">
            <Banner />
          </div>
          <div>
            <ServiceCarousel />
          </div>
          <div>
            <DonateUs />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
    </CartProvider>
  );
}
