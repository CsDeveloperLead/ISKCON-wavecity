"use client"
import Image from 'next/image';
import { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from 'react-icons/fa';

const data = [
  {
    title: 'Vaishnava Calendar',
    description: 'Explore Wavecity',
    image: '/images/ceremony.jpg',
  },
  {
    title: 'Guest House Booking',
    description: 'Explore Wavecity',
    image: '/images/ceremony.jpg',
  },
  {
    title: 'Dining Options',
    description: 'Explore Wavecity',
    image: '/images/ceremony.jpg',
  },
  {
    title: 'Holy Dham Etiquette',
    description: 'Explore Wavecity',
    image: '/images/ceremony.jpg',
  },
  {
    title: 'Vaishnava Calendar',
    description: 'Explore Wavecity',
    image: '/images/ceremony.jpg',
  },
  {
    title: 'Guest House Booking',
    description: 'Explore Wavecity',
    image: '/images/ceremony.jpg',
  },
  {
    title: 'Dining Options',
    description: 'Explore Wavecity',
    image: '/images/ceremony.jpg',
  },
  {
    title: 'Holy Dham Etiquette',
    description: 'Explore Wavecity',
    image: '/images/ceremony.jpg',
  },
];

const ExploreWavecity = () => {
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

  return (
    <div className=" py-10 bg-[#f9f9f9] rounded-lg relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Explore Wavecity</h2>
        <button className="bg-main px-6 py-2 rounded-full text-white font-semibold">View All</button>
      </div>

      <div className="flex items-center overflow-hidden py-4">
        {/* Previous button */}
        <button
          className="absolute -left-8 z-50 p-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
          onClick={handlePrev}
        >
          <FaChevronLeft />
        </button>

        {/* Card Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[calc(100%/3-1rem)] mx-2  bg-white rounded-lg shadow-md"
            >
              <div className=" w-full h-[180px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1200}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-center text-gray-800 px-4 ">
                {item.title}
              </h3>
              <p className="text-gray-500 text-center px-4 mb-4">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Next button */}
        <button
          className="absolute -right-8 z-50 p-4 bg-white rounded-full shadow-lg hover:bg-gray-200 transition"
          onClick={handleNext}
        >
         <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ExploreWavecity;
