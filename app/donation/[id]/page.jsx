"use client";

// import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import MainNavbar from "../../Components/MainNavbar";

import Footer from "../../Components/Footer";
import { useCart } from "../../contexts/CartContext";
import { FaTrash } from "react-icons/fa";

const data = [
  {
    id: 1,
    title: "Temple Construction",
    description:
      "Taking part in these festivals means a step forward for our self-realization",
    desc2:
      "(Festival Lectures by Srila Prabhupada Quoted in London on July 13, 1972)",
    image: "/images/navbg.png",
    services: [
      {
        service_name: "Temple Construction",
        donation_types: [
          { id: 1, type: "5 CFT Sand", price: 300 },
          { id: 2, type: "10 CFT Sand", price: 500 },
          { id: 3, type: "20 CFT Sand", price: 1000 },
          { id: 4, type: "1 Bag Cement", price: 400 },
          { id: 5, type: "100 Bricks", price: 750 },
          { id: 6, type: "4 Bag Cement", price: 1600 },
          { id: 7, type: "300 Bricks", price: 2100 },
          { id: 8, type: "500 Bricks", price: 3500 },
          { id: 9, type: "10 Bag Cement", price: 4000 },
          { id: 10, type: "100 Kg TMT Saria", price: 5100 },
          { id: 11, type: "1 Sq. Foot Area", price: 9999 },
          { id: 12, type: "Half Sq. Foot Area", price: 4999 },
          { id: 13, type: "1000 Bricks", price: 7000 },
          { id: 14, type: "2 Sq. Feet Area", price: 19999 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Sadhu Bhojan Seva",
    description:
      "Taking part in these festivals means a step forward for our self-realization",
    desc2:
      "(Festival Lectures by Srila Prabhupada Quoted in London on July 13, 1972)",
    image: "/images/navbg.png",
    services: [
      {
        service_name: "Sadhu Bhojan",
        donation_types: [
          {
            id: 15,
            type: "Bhojan For 1 Sadhu",
            price: 100,
          },
          {
            id: 16,
            type: "Bhojan For 5 Sadhus",
            price: 500,
          },
          {
            id: 17,
            type: "Bhojan For 10 Sadhus",
            price: 1000,
          },
          {
            id: 18,
            type: "Bhojan For 20 Sadhus",
            price: 2000,
          },
          {
            id: 19,
            type: "Bhojan For 50 Sadhus",
            price: 5000,
          },
          {
            id: 20,
            type: "1 Day Sadhu Bhojan Seva",
            price: 11000,
          },
        ],
      },
    ],
  },

  {
    id: 3,
    title: "Food For Life",
    description:
      "Taking part in these festivals means a step forward for our self-realization",
    desc2:
      "(Festival Lectures by Srila Prabhupada Quoted in London on July 13, 1972)",
    image: "/images/navbg.png", // Example image URL, change as needed
    services: [
      {
        service_name: "Food Distribution",
        donation_types: [
          {
            id: 21,
            type: "5 Meals",
            price: 250,
          },
          {
            id: 22,
            type: "10 Meals",
            price: 500,
          },
          {
            id: 23,
            type: "20 Meals",
            price: 1000,
          },
          {
            id: 24,
            type: "50 Meals",
            price: 2500,
          },
          {
            id: 25,
            type: "100 Meals",
            price: 5000,
          },
          {
            id: 26,
            type: "250 Meals",
            price: 12500,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Diety Seva Vigraha Seva",
    description:
      "Taking part in these festivals means a step forward for our self-realization",
    desc2:
      "(Festival Lectures by Srila Prabhupada Quoted in London on July 13, 1972)",
    image: "/images/navbg.png", // Example image URL, change as needed
    services: [
      {
        service_name: "Vigrah Seva",
        donation_types: [
          {
            id: 27,
            type: "Vaikalika Bhoga",
            price: 1000,
          },
          {
            id: 28,
            type: "Sakalika Bhoga",
            price: 1100,
          },
          {
            id: 29,
            type: "Balya Bhoga",
            price: 1500,
          },
          {
            id: 30,
            type: "Shayana Bhoga",
            price: 2000,
          },
          {
            id: 31,
            type: "Sandhaya Bhoga",
            price: 2500,
          },
          {
            id: 32,
            type: "Raja Bhoga",
            price: 3500,
          },
          {
            id: 33,
            type: "Pushpa Seva",
            price: 5100,
          },
          {
            id: 34,
            type: "All Seva of the Day",
            price: 17000,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Gau Seva",
    description:
      "Taking part in these festivals means a step forward for our self-realization",
    desc2:
      "(Festival Lectures by Srila Prabhupada Quoted in London on July 13, 1972)",
    image: "/images/navbg.png", // Example image URL, change as needed
    services: [
      {
        service_name: "Feed A Cow",
        donation_types: [
          {
            id: 35,
            type: "5 Days",
            price: 500,
          },
          {
            id: 36,
            type: "10 Days",
            price: 1000,
          },
          {
            id: 37,
            type: "15 Days",
            price: 1500,
          },
          {
            id: 38,
            type: "1 Month",
            price: 3000,
          },
        ],
      },
      {
        service_name: "Care For Cows",
        donation_types: [
          {
            id: 39,
            type: "Medicine for 1 Cow",
            price: 550,
          },
          {
            id: 40,
            type: "Medicine for 2 Cow",
            price: 1100,
          },
          {
            id: 41,
            type: "Medicine for 5 Cow",
            price: 2700,
          },
          {
            id: 42,
            type: "Medicine for 10 Cow",
            price: 5500,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Feast Sponsorship",
    description:
      "Taking part in these festivals means a step forward for our self-realization",
    desc2:
      "(Festival Lectures by Srila Prabhupada Quoted in London on July 13, 1972)",
    image: "/images/navbg.png", // Example image URL, change as needed
    services: [
      {
        service_name: "Feast Sponsorship",
        donation_types: [
          {
            id: 43,
            type: "2 Drum Khichdi for 100 People",
            price: 3100,
          },
          {
            id: 44,
            type: "2 Drum Kheer for 100 People",
            price: 5100,
          },
          {
            id: 45,
            type: "2 Drum Rajma Rice for 100 People",
            price: 6500,
          },
          {
            id: 46,
            type: "Bhojan for 150 Sadhus",
            price: 11000,
          },
          {
            id: 47,
            type: "Sunday Love Feast",
            price: 21000,
          },
          {
            id: 48,
            type: "Festival Feast",
            price: 51000,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Nitya Seva",
    description:
      "Taking part in these festivals means a step forward for our self-realization",
    desc2:
      "(Festival Lectures by Srila Prabhupada Quoted in London on July 13, 1972)",
    image: "/images/navbg.png", // Example image URL, change as needed
  },
  {
    id: 8,
    title: "Gita Daan Seva",
    description:
      "Taking part in these festivals means a step forward for our self-realization",
    desc2:
      "(Festival Lectures by Srila Prabhupada Quoted in London on July 13, 1972)",
    image: "/images/navbg.png", // Example image URL, change as needed
  },
];

const CardDetails = () => {
  const [addedDonations, setAddedDonations] = useState([]);
  const params = useParams();
  const { id } = params;
  const { addToCart, removeFromCart } = useCart();

  // Find the card by id
  const card = data.find((item) => item.id === Number(id));

  // Handle case where card is not found (e.g., invalid id)
  if (!card) {
    return <div>Card not found</div>;
  }

  const handleAddDonation = (donation) => {
    console.log("Donation being added:", donation);
    addToCart(donation);
    setAddedDonations((prev) => [...prev, donation._id]);
  };

  const handleRemoveDonation = (donationId) => {
    removeFromCart(donationId);
    setAddedDonations((prev) => prev.filter((id) => id !== donationId)); // Remove the donation ID from the state
  };

  return (
    <div className="bg-[#f9f9fd]">
      <div className="mx-28">
        <MainNavbar />
      </div>

      <div className="mx-28 my-4">
        <div className="flex justify-between gap-6 ">
          <div className="bg-[url('/images/donationbg.png')] bg-cover h-[350px] w-[65%] rounded-md flex justify-between items-center p-8 gap-8">
            <div className="flex flex-col gap-8 w-[55%]">
              <div className="flex flex-col gap-4">
                <h1 className="text-white font-bold text-4xl">{card.title}</h1>
                <h1 className="text-white font-semibold text-sm">
                  {card.description}
                </h1>
              </div>
              <p className="text-white font-semibold text-sm">{card.desc2}</p>
              <button className="bg-white w-[150px] text-gray-600 rounded-lg py-3 flex justify-center items-center">
                Read more
              </button>
            </div>
            <div className="w-[30%] flex flex-col gap-4">
              <div className="flex gap-2">
                <span className="bg-white w-12 h-12 flex justify-center items-center rounded-xl">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.3203 14.8504L18.937 6.26036C18.428 4.42283 17.3191 2.80832 15.7867 1.67381C14.2542 0.539289 12.3863 -0.0500437 10.4802 -0.000397369C8.57417 0.049249 6.73949 0.735022 5.26817 1.94778C3.79686 3.16053 2.77347 4.83057 2.36089 6.69211L0.517473 14.9879C0.428275 15.3898 0.43045 15.8067 0.52384 16.2076C0.617229 16.6086 0.799448 16.9834 1.05705 17.3046C1.31466 17.6257 1.64108 17.8849 2.01223 18.063C2.38338 18.2411 2.78979 18.3337 3.20147 18.3338H6.50789C6.71828 19.3699 7.28039 20.3014 8.09899 20.9705C8.91758 21.6395 9.94231 22.005 10.9996 22.005C12.0568 22.005 13.0815 21.6395 13.9001 20.9705C14.7187 20.3014 15.2808 19.3699 15.4912 18.3338H18.6721C19.0957 18.3336 19.5135 18.2355 19.893 18.0473C20.2724 17.859 20.6033 17.5857 20.8597 17.2485C21.1161 16.9113 21.2912 16.5195 21.3712 16.1035C21.4513 15.6875 21.4333 15.2587 21.3203 14.8504ZM10.9996 20.1671C10.4328 20.1648 9.88064 19.9874 9.41858 19.6592C8.95652 19.331 8.60713 18.8681 8.41822 18.3338H13.5809C13.392 18.8681 13.0426 19.331 12.5805 19.6592C12.1185 19.9874 11.5663 20.1648 10.9996 20.1671ZM19.4008 16.1384C19.3153 16.2517 19.2044 16.3435 19.0771 16.4064C18.9498 16.4693 18.8095 16.5015 18.6675 16.5004H3.20147C3.06421 16.5004 2.92871 16.4696 2.80497 16.4102C2.68122 16.3508 2.5724 16.2644 2.48652 16.1573C2.40065 16.0502 2.33992 15.9252 2.30881 15.7915C2.27771 15.6578 2.27702 15.5188 2.30681 15.3849L4.15022 7.08903C4.47505 5.62805 5.27892 4.31758 6.43406 3.36594C7.58919 2.4143 9.02929 1.8761 10.5254 1.83691C12.0216 1.79771 13.4879 2.25977 14.6913 3.14962C15.8946 4.03948 16.766 5.30606 17.1669 6.74803L19.5502 15.3381C19.5891 15.4739 19.5959 15.617 19.57 15.7559C19.544 15.8948 19.4861 16.0257 19.4008 16.1384Z"
                      fill="#4A5E88"
                    />
                  </svg>
                </span>
                <span className="flex flex-col justify-center">
                  <p className="text-white text-[12px]">Availability</p>
                  <h1 className="text-white">365 Days Live Darshan</h1>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="bg-white w-12 h-12 flex justify-center items-center rounded-xl">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.75 2.62549C1.75 1.17561 2.92513 0.000488281 4.375 0.000488281C5.82487 0.000488281 7 1.17561 7 2.62549C7 4.07536 5.82487 5.25049 4.375 5.25049C2.92513 5.25049 1.75 4.07536 1.75 2.62549ZM6.125 9.62549C6.125 11.0754 7.30013 12.2505 8.75 12.2505C10.1999 12.2505 11.375 11.0754 11.375 9.62549C11.375 8.17561 10.1999 7.00049 8.75 7.00049C7.30013 7.00049 6.125 8.17561 6.125 9.62549ZM13.125 5.25049C14.5749 5.25049 15.75 4.07536 15.75 2.62549C15.75 1.17561 14.5749 0.000488281 13.125 0.000488281C11.6751 0.000488281 10.5 1.17561 10.5 2.62549C10.5 4.07536 11.6751 5.25049 13.125 5.25049ZM5.20888 7.11074C5.02775 6.40899 4.31462 5.98024 3.61025 6.16749C1.51812 6.70561 0 8.71199 0 10.938C0 11.6625 0.587125 12.2505 1.3125 12.2505C2.03787 12.2505 2.625 11.6625 2.625 10.938C2.625 9.90811 3.33025 8.94999 4.26475 8.70849C4.9665 8.52824 5.38912 7.81249 5.20888 7.11074ZM14.875 10.938C14.875 11.6625 15.4621 12.2505 16.1875 12.2505C16.9129 12.2505 17.5 11.6625 17.5 10.938C17.5 8.71199 15.9819 6.70561 13.8897 6.16749C13.188 5.98024 12.4722 6.40811 12.2911 7.11074C12.11 7.81249 12.5326 8.52824 13.2353 8.70849C14.1698 8.94911 14.875 9.90811 14.875 10.938ZM19.6875 15.7505H18.375V14.438C18.375 13.7135 17.7879 13.1255 17.0625 13.1255C16.3371 13.1255 15.75 13.7135 15.75 14.438V15.7505H14.4375C13.7121 15.7505 13.125 16.3385 13.125 17.063C13.125 17.7875 13.7121 18.3755 14.4375 18.3755H15.75V19.688C15.75 20.4125 16.3371 21.0005 17.0625 21.0005C17.7879 21.0005 18.375 20.4125 18.375 19.688V18.3755H19.6875C20.4129 18.3755 21 17.7875 21 17.063C21 16.3385 20.4129 15.7505 19.6875 15.7505ZM10.4563 13.3854C9.9085 13.213 9.3345 13.1255 8.75 13.1255C5.85462 13.1255 3.5 15.285 3.5 17.938C3.5 18.6625 4.08712 19.2505 4.8125 19.2505C5.53788 19.2505 6.125 18.6625 6.125 17.938C6.125 16.7314 7.30275 15.7505 8.75 15.7505C9.06675 15.7505 9.37563 15.7977 9.66875 15.8887C10.3626 16.1092 11.0968 15.7225 11.3146 15.0304C11.5316 14.3391 11.1475 13.6024 10.4563 13.3854Z"
                      fill="#4A5E88"
                    />
                  </svg>
                </span>
                <span className="flex flex-col justify-center">
                  <p className="text-white text-[12px]">Community</p>
                  <h1 className="text-white">Visit Vedic Farm Community</h1>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="bg-white w-12 h-12 flex justify-center items-center rounded-xl">
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.63213 6.23635C8.63213 5.44285 9.27613 4.79885 10.0696 4.79885C10.8631 4.79885 11.5071 5.44285 11.5071 6.23635C11.5071 7.02985 10.8631 7.67385 10.0696 7.67385C9.27613 7.67385 8.63213 7.02985 8.63213 6.23635ZM22.85 14.5269C22.1734 16.8461 20.9448 18.9391 19.2974 20.5797C17.7468 22.1226 15.558 23.0081 13.2896 23.0081H9.72271C7.4553 23.0081 5.26646 22.1226 3.71588 20.5807C2.06946 18.94 0.840881 16.847 0.163339 14.5269C-0.181661 13.3462 0.0425889 12.1061 0.778589 11.1239C1.10634 10.6869 1.51171 10.3342 1.9698 10.0774C1.94009 9.87514 1.92476 9.67102 1.92476 9.46402C1.92476 8.02556 2.6598 6.72989 3.84909 5.98623C3.84334 5.9086 3.84046 5.83289 3.84046 5.75814C3.84046 3.5051 5.80792 1.66989 8.09259 1.94973C8.80367 0.760434 10.0878 0.00622559 11.5081 0.00622559C12.9283 0.00622559 14.2125 0.759476 14.9236 1.94877C17.1421 1.68427 19.0875 3.42556 19.1719 5.60864C20.3564 6.3571 21.0914 7.6566 21.0914 9.08164C21.0914 9.4046 21.0521 9.7266 20.9783 10.04C21.4633 10.2997 21.8916 10.6658 22.2357 11.1229C22.9717 12.1042 23.1959 13.3443 22.8509 14.5259L22.85 14.5269ZM3.84142 9.46306C3.84142 9.50618 3.84334 9.54835 3.84526 9.59148H12.5431C12.4885 9.4391 12.4588 9.27523 12.4588 9.10464C12.4588 8.31114 13.1028 7.66714 13.8963 7.66714C14.6898 7.66714 15.3338 8.31114 15.3338 9.10464C15.3338 9.27523 15.304 9.4391 15.2494 9.59148H19.1163C19.1546 9.42664 19.1748 9.25606 19.1748 9.0826C19.1748 8.19614 18.6371 7.39881 17.8053 7.05189C17.4018 6.88323 17.1632 6.46252 17.2265 6.02935C17.2428 5.91914 17.2571 5.84056 17.2571 5.75814C17.2571 4.7011 16.3975 3.84148 15.3405 3.84148C15.1392 3.84148 14.9303 3.88077 14.7041 3.96127C14.4617 4.04848 14.1933 4.03314 13.9624 3.92006C13.7305 3.80698 13.5532 3.60477 13.4727 3.35943C13.188 2.50077 12.3993 1.92385 11.5071 1.92385C10.6149 1.92385 9.82526 2.50173 9.54063 3.36039C9.45917 3.60573 9.28284 3.80698 9.05092 3.92006C8.81901 4.03314 8.55067 4.04848 8.30917 3.96127C8.08301 3.88077 7.87409 3.84148 7.67284 3.84148C6.6158 3.84148 5.75617 4.7011 5.75617 5.75814C5.75617 5.90477 5.78109 6.06577 5.83667 6.2651C5.96796 6.73948 5.71784 7.23589 5.2588 7.41318C4.39726 7.74668 3.84046 8.55168 3.84046 9.46402L3.84142 9.46306ZM20.7014 12.2739C20.3372 11.787 19.7795 11.5081 19.1709 11.5081H3.84238C3.2348 11.5081 2.67705 11.787 2.31288 12.2729C1.94201 12.7674 1.82988 13.3932 2.0043 13.9893C2.58313 15.9711 3.67084 17.8303 5.07001 19.2218C6.26217 20.4101 7.95938 21.0915 9.72271 21.0915H13.2896C15.0539 21.0915 16.7502 20.4101 17.9443 19.2218C19.3425 17.8284 20.4311 15.9701 21.009 13.9893C21.1834 13.3932 21.0713 12.7674 20.7014 12.2739Z"
                      fill="#4A5E88"
                    />
                  </svg>
                </span>
                <span className="flex flex-col justify-center">
                  <p className="text-white text-[12px]">Donate</p>
                  <h1 className="text-white">Prasad Distribution</h1>
                </span>
              </div>
            </div>
            <div></div>
          </div>
          <div className="w-[40%] rounded-md">
            <Image
              src="/images/krishna.jpg"
              alt=""
              width={1000}
              height={400}
              className="w-full h-[350px] rounded-md"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="mx-28 py-6">
          <div className="grid gap-10">
            {card.services.map((service, serviceIndex) => (
              <div key={serviceIndex}>
                <h3 className="text-3xl font-bold text-[#204289] my-8">
                  {service.service_name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {service.donation_types.map((donation) => (
                    <div
                      key={donation.id}
                      className={`border h-[150px] p-4 rounded-lg shadow-sm flex flex-col justify-center gap-8 ${
                        addedDonations.includes(donation.id)
                          ? "bg-main text-white"
                          : ""
                      }`} // Change background and text color if added
                    >
                      <div>
                        <h4 className="text-lg font-semibold">
                          {donation.type}
                        </h4>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold">
                          ₹{donation.price}
                        </p>
                        {addedDonations.includes(donation.id) ? (
                          // If the donation is added, show the delete icon
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => handleRemoveDonation(donation.id)}
                          >
                            <FaTrash className="text-white" />
                          </div>
                        ) : (
                          // Show "Add Donation" button if not added
                          <div
                            className="bg-main rounded-lg px-6 py-2 text-white font-bold text-md flex justify-center items-center cursor-pointer"
                            onClick={() =>
                              handleAddDonation({
                                _id: donation.id,
                                name: donation.type,
                                price: donation.price,
                                quantity: 1, // Add default quantity
                              })
                            }
                          >
                            Add Donation
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CardDetails;
