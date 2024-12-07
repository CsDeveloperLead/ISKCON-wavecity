"use client";

import Footer from "@/app/Components/Footer";
import { Main } from "next/document";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainNavbar from "../../Components/MainNavbar";
import { useCart } from "../../contexts/CartContext";
const Page = () => {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `https://isckon-backend.vercel.app/api/v1/products/${id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch product details");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className=" text-black flex flex-col  gap-8">
      <div className="flex flex-col mx-28 ">
        <MainNavbar />
        {/* Product Image */}
        <div className="flex gap-10 justify-between my-10">
          <div className="w-1/2 h-[450px] rounded-3xl shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
            <img
              src={product.data.Image}
              alt={product.data.name}
              className="w-full h-full  rounded-3xl "
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.data.name}</h1>
              <p className="text-gray-700 mb-6">{product.data.desc}</p>
              <p className="text-green-600 font-semibold text-xl mb-4">
                Price: ₹{product.data.price}
              </p>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecrease}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-700 font-bold">
                  Total Price: ₹{quantity * product.data.price}
                </span>

                <button
                  className="px-6 py-2 w-[200px] bg-main text-white rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    const cartItem = { ...product.data, quantity: +quantity }; // Ensure quantity is correctly set
                    addToCart(cartItem); // Pass the updated product with quantity
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
