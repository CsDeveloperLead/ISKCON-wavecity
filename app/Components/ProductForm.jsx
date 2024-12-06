import { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ product, closePopup, refreshProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    product_id: "",
    desc: "",
    price: 0,
    category: "",
    quantity: "",
    countInStock: 0,
  });

  const [mainImage, setMainImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Pre-fill form data with product details if available
    if (product) {
      setFormData({
        name: product.name || "",
        product_id: product.product_id || "",
        desc: product.desc || "",
        price: product.price || 0,
        category: product.category || "",
        quantity: product.quantity || "",
        countInStock: product.countInStock || 0,
      });
    }
  }, [product]);

  // Handles input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handles file input change
  const handleFileChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (mainImage) {
      data.append("Image", mainImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/products/${product._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Product updated successfully!");
        refreshProducts(); // Refresh product list
        closePopup(); // Close popup after successful update
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err?.response?.data?.message ?? "Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <label className="block mb-4">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>

          {/* Product ID (Disabled) */}
          <label className="block mb-4">
            Product ID:
            <input
              type="text"
              name="product_id"
              value={formData.product_id}
              disabled
              className="block w-full mt-1 border border-gray-300 p-2 rounded bg-gray-100"
            />
          </label>

          {/* Main Image Upload */}
          <label className="block mb-4">
            Main Image:
            <input
              type="file"
              name="Image"
              onChange={handleFileChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
            />
          </label>

          {/* Description */}
          <label className="block mb-4">
            Description:
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>

          {/* Price */}
          <label className="block mb-4">
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>

          {/* Category */}
          <label className="block mb-4">
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>

          {/* Quantity */}
          <label className="block mb-4">
            Quantity:
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
            />
          </label>

          {/* Count in Stock */}
          <label className="block mb-4">
            Count in Stock:
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>

          {/* Form Buttons */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={closePopup}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
