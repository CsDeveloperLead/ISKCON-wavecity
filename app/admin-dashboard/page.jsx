"use client";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import AddNewButton from "../Components/Buttons";
import ProductForm from "../Components/ProductForm"; // Import the ProductForm component
// import { convertImageToBase64 } from "../utils";

const Page = () => {

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formDataValues, setFormDataValues] = useState({});
  const [mainImage, setMainImage] = useState(null);

//   const [orders, setOrders] = useState([]);

  const [isGridVisible, setGridVisible] = useState(false);

  // Toggle grid visibility
  const toggleGridVisibility = () => {
    setGridVisible(!isGridVisible);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/products");
        if (response.data.success) {
          setProducts(response.data.data); // Adjust based on server response structure
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
   const openPopup = (product) => {
     setCurrentProduct(product);
     setIsPopupOpen(true);
   };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentProduct(null);
  };

   const deleteProduct = async (product) => {
     try {
        // Ensure to include the authentication token if required
       const response = await axios.delete(
         `${backend}/api/v1/products/${product._id}`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
           },
         }
       );

       console.log(response.data);

    //    Update the products state by filtering out the deleted product
       setProducts(products.filter((item) => item._id !== product._id));
       alert("Product deleted successfully");
     } catch (error) {
       console.error("Error deleting product:", error);
       alert("Failed to delete product");
        // Optionally display an error message to the user
     }
   };

  const handleImageChange = (e) => {
    if (e.target.name === "Image") {
      setMainImage(e.target.files[0]);
    }
   
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormDataValues({ ...formDataValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formDataValues.name);
    formData.append("product_id", formDataValues.product_id);
    formData.append("desc", formDataValues.desc);
    formData.append("price", formDataValues.price);
    formData.append("category", formDataValues.category);
    formData.append("quantity", formDataValues.quantity);
    formData.append("countInStock", formDataValues.countInStock);
    if (mainImage) formData.append("Image", mainImage);
   



console.log(formData);
    try {
      // Make a POST request to create the product
      const response = await axios.post(
        `${backend}/api/v1/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      if (response.status !== 201) {
        console.error("Failed to create product:", response.data);
        alert("Failed to create product");
        // Optionally display an error message to the user
      } else {
        console.log("Product created successfully:", response.data);

        // Update the products state with the new product
        setProducts([...products, response.data]);
        alert("Product created successfully");
        closeModal();
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert(error?.response?.data?.message ?? "Failed to create product");
      // Optionally display an error message to the user
    }
  };

//   useEffect(() => {
//     // Fetch orders when the component loads
//     const fetchOrders = async () => {
//         try {
//             const response = await axios.get(`${backend}/api/v1/orders`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Assuming you're using a token
//                 },
//             });

//             // Set all the orders without filtering by user email
//             setOrders(response.data);
//         } catch (err) {
//             console.error('Error fetching orders:', err);
//             setError('Failed to load orders');
//         }
//     };

//     fetchOrders();
// }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="w-full flex flex-col items-center px-10 mt-20">
      <div>
        {/* Icon to open the modal */}
        <div className="w-full shadow-md h-[150px] rounded-3xl flex justify-center items-center p-4 border drop-shadow-md border-gray-400">
        <div className="flex flex-col items-center">
          <AddNewButton onClick={openModal} />
          <span className="px-6 mt-4 text-3xl font-bold">Create New Product</span>
        </div>
      </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="w-full flex justify-center">
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={closeModal}
              />
              <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-h-[90vh] w-[70%] overflow-y-auto">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="flex flex-col space-y-4"
                >
                  {/* Product Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Product ID */}
                  <div>
                    <label
                      htmlFor="product_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product ID:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="product_id"
                      name="product_id"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description:
                    </label>
                    <textarea
                      id="desc"
                      name="desc"
                      required
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price:
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="category"
                      name="category"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="quantity"
                      name="quantity"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Count in Stock */}
                  <div>
                    <label
                      htmlFor="countInStock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Count In Stock:
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="countInStock"
                      name="countInStock"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Main Image */}
                  <div>
                    <label
                      htmlFor="Image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Main Image:
                    </label>
                    <input
                      type="file"
                      id="Image"
                      name="Image"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                 

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-10 w-full flex flex-col items-center ">
        <div className="w-full flex justify-center">
      <button
        onClick={toggleGridVisibility}
        className="w-[40%] md:w-[20%] flex justify-center mb-4 py-2 bg-[#592d1e] text-white rounded-md hover:bg-[#421d11]"
      >
        {isGridVisible ? 'Hide Products' : 'Manage Products'}
      </button>
      </div>

      {isGridVisible && (
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-6 lg:gap-8  mt-20">
        {products.length > 0 ? (
          products.map((item) => {
            return (
              <div
                key={item._id}
                className="card border rounded-lg overflow-hidden shadow-lg flex flex-col col-span-1"
              >
                <div className="relative w-full pb-[55%]">
                  
                  <img
                    src={item.Image} 
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-sm md:text-base font-bold h-[60px] md:h-[40px]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <div className="flex flex-col">
                    <button
                      onClick={() => openPopup(item)}
                      className="w-full mt-4 rounded-md text-sm sm:text-base bg-blue-500 text-white font-bold  py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(item)}
                      className="w-full mt-2 rounded-md text-sm sm:text-base bg-red-500 text-white font-bold py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-6 text-2xl text-center font-bold my-10 text-[#592d1e]">You have not added any products yet.</p>
        )}
      </div>
       )}
    </div>

      {isPopupOpen && currentProduct && (
        <ProductForm
          product={currentProduct}
          closePopup={closePopup}
          refreshProducts={() => {
            axios
              .get(`${backend}/api/v1/products`)
              .then((response) => setProducts(response.data));
          }}
        />
      )}
    </div>
    <div>
    {/* <div className="w-full px-5 py-10 bg-white">
            <h1 className="text-3xl font-bold mb-6 flex justify-center">Order History</h1>
            {orders.length > 0 ? (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Order ID</th>
                            <th className="border px-4 py-2">User</th>
                            <th className="border px-4 py-2">Items</th>
                            <th className="border px-4 py-2">Total Price</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-100 text-center">
                                <td className="border px-4 py-2">{order._id}</td>
                                <td className="border px-4 py-2">{order.user}</td>
                                <td className="border px-4 py-2">
                                    {order.items.map((item, index) => (
                                        <div key={index}>
                                            {item.name} (x{item.quantity}) - ₹{item.price}
                                        </div>
                                    ))}
                                </td>
                                <td className="border px-4 py-2">₹{(order.amount)/100}</td>
                                <td className="border px-4 py-2">{order.status}</td>
                                <td className="border px-4 py-2">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="w-full flex justify-center text-2xl font-bold my-10 text-[#592d1e]" >No orders found for this user.</p>
            )}
        </div> */}
    </div>
    </div>
  );
};

export default Page;
