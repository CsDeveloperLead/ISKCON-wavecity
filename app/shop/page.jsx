"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import MainNavbar from "../Components/MainNavbar";
import Footer from "../Components/Footer";
import HexLoader from "../Components/HexLoader";
import { useCart } from "../contexts/CartContext";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // State to track selected category
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 8; // Show 8 products per page
  const { addToCart } = useCart();


  // Fetch products from the backend
  useEffect(() => {
    Axios.get("https://isckon-backend.vercel.app/api/v1/products")
      .then((response) => {
        const data = response.data.data;
        setProducts(data);
        setFilteredProducts(data); // Initially, no filter

        // Extract unique categories from the products
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)), // Assuming each product has a 'category' field
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));

    setLoading(false);
  }, []);

  // Filter products based on category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category); // Set selected category
    if (category === "") {
      setFilteredProducts(products); // Show all products if no category filter is selected
    } else {
      const filtered = products.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to first page when filter is applied
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div>
      <div className="mx-28 relative h-full">
        <MainNavbar />
        {/* <div>
          <HexLoader />
        </div> */}

        {/* Dynamic Category Filter Buttons */}
        <div className="w-full flex justify-center space-x-6">
          <button
            onClick={() => handleCategoryFilter("")}
            className={`${
              selectedCategory === ""
                ? "bg-main text-white shadow-[0_1px_5px_rgba(0,0,0,0.5)] "
                : "bg-white text-black shadow-[0_1px_5px_rgba(0,0,0,0.5)]"
            }  px-4 py-2 rounded-full`}
          >
            All Categories
          </button>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryFilter(category)}
              className={`${
                selectedCategory === category
                  ? "bg-main text-white shadow-[0_1px_5px_rgba(0,0,0,0.5)]  "
                  : "bg-white text-black shadow-[0_1px_5px_rgba(0,0,0,0.5)]  "
              }  px-4 py-2 rounded-full `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Display Products */}
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div>
              <HexLoader />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 my-20">
            {currentProducts.map((product) => (
              <div key={product._id} className="flex flex-col items-center">
                <div className="w-[300px] h-auto bg-white rounded-md shadow-lg">
                  <div className="w-full h-[200px] bg-gray-200 mb-4">
                    {/* Image Display */}
                    <img
                      src={product.Image} // Assuming Image is the key for product images
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-md text-center text-gray-600 font-bold mb-2">
                    {product.name}
                  </h3>
                  <div className="w-[90%] px-4 flex flex-col items-center  font-bold">
                    {/* <span>Quantity : {product.quantity}</span> */}
                    <span className="text-gray-600 flex">Price : <p className="text-main">₹{product.price}</p></span>
                  </div>
                  <div className="w-full flex justify-center">
                    <button className="bg-main text-white text-sm font-semibold w-[90%] py-2 rounded-md my-4"  onClick={() => handleAddToCart({
                          id: product.id,
                          title: product.name,
                          price: product.price,
                        })}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination Controls */}
        <div className="pagination flex justify-center mt-6 space-x-4 my-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-main text-white px-8 py-2 rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.5)] "
          >
            Prev
          </button>
          {Array.from(
            { length: Math.ceil(filteredProducts.length / productsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-main text-white "
                    : "bg-white text-black "
                }  px-4 py-2 rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.5)] `}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredProducts.length / productsPerPage)
            }
            className="bg-main text-white px-8 py-2 rounded-full shadow-[0_1px_5px_rgba(0,0,0,0.5)] "
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
