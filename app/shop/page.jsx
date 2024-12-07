"use client";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import MainNavbar from "../Components/MainNavbar";
import Footer from "../Components/Footer";
import HexLoader from "../Components/HexLoader";
import Link from "next/link";

const Page = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 8;
  // const { addToCart } = useCart();

  // Fetch products from the backend
  useEffect(() => {
    Axios.get("https://isckon-backend.vercel.app/api/v1/products")
      .then((response) => {
        const data = response.data.data;
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));

    setLoading(false);
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  }, [selectedCategory, searchTerm, products]);

  const handleCategoryFilter = (category) => setSelectedCategory(category);
  const handleSearch = (event) => setSearchTerm(event.target.value);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const handleAddToCart = (product) => addToCart(product);

  return (
    <div>
      <div className="mx-28 relative h-full">
        <MainNavbar />

        {/* Search Bar */}
        <div className="w-full flex justify-center mt-4 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-1/2 px-4 py-2 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-main"
          />
        </div>

        {/* Dynamic Category Filter Buttons */}
        <div className="w-full flex justify-center space-x-6 mt-6">
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
            <HexLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 my-20">
            {currentProducts.map((product) => (
              <div key={product._id} className="flex flex-col items-center">
                <div className="w-[300px] h-auto bg-white rounded-md shadow-lg">
                  <div className="w-full h-[200px] bg-gray-200 mb-4">
                    <img
                      src={product.Image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-md text-center text-gray-600 font-bold mb-2">
                    {product.name}
                  </h3>
                  <div className="w-[90%] px-4 flex flex-col items-center font-bold">
                    <span className="text-gray-600 flex">
                      Price: <p className="text-main">₹{product.price}</p>
                    </span>
                  </div>
                  <div className="w-full flex justify-center">
                    <Link
                      href={`/productPage/${product._id}`}
                      className=" w-[90%]"
                    >
                      <button className="bg-main text-white text-sm font-semibold py-2 w-full rounded-md my-4">
                        See Product
                      </button>
                    </Link>
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
