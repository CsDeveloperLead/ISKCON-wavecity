// components/ServicesCarousel.js
"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";

// Sample services data
const data = [
  { id: 1, title: "Simple Living, High Thinking", icon: "/images/logo.svg" },
  { id: 2, title: "Srila Prabhupada Audiobooks", icon: "/images/logo.svg" },
  { id: 3, title: "Life Membership", icon: "/images/logo.svg" },
  { id: 4, title: "Community Service Centre", icon: "/images/logo.svg" },
  { id: 5, title: "Gomata Products", icon: "/images/logo.svg" },
  { id: 6, title: "Buy Books Online", icon: "/images/logo.svg" },
  { id: 7, title: "Service 7", icon: "/images/logo.svg" },
  { id: 8, title: "Service 8", icon: "/images/logo.svg" },
  { id: 9, title: "Service 9", icon: "/images/logo.svg" },
  { id: 10, title: "Service 10", icon: "/images/logo.svg" },
];

const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3; // Show 3 cards at a time

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? data.length - itemsToShow : prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex >= data.length - itemsToShow ? 0 : prevIndex + 1;
    });
  };

  console.log("Current Index:", currentIndex); // Debugging currentIndex

  return (
    <div className="relative w-full p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-1">
        <h2 className="text-2xl text-gray-600 font-bold">20+ Services</h2>
        <h2 className="text-sm text-gray-600 font-semibold">Explore Our Services</h2>
        </div>
        
        <button className="px-4 py-3 text-sm font-semibold text-white bg-main rounded-full  hover:bg-blue-800">
          See all services
        </button>
      </div>

      <div className="flex items-center overflow-hidden">
        {/* Left Arrow */}
        <div>
          <button
            className="absolute -left-1 top-1/2 z-50 p-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
            onClick={handlePrev}
          >
            <FaChevronLeft/>
          </button>
        </div>

        {/* Carousel Items */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
          }}
        >
          {data.map((service) => (
            <div
              key={service.id}
              className="w-1/6 flex-shrink-0 flex flex-col items-center justify-center p-4" // Set width to 1/5 to show 5 items
            >
              <div className="w-40 h-40 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={2000}
                  height={2000}
                  className="w-20 h-20"
                />
              </div>
              <p className="text-center text-gray-700">{service.title}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <div>
          <button
            className="absolute -right-4 top-1/2 z-50 p-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ServiceCarousel;
