// components/EventSection.js
import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between  items-center bg-gradient-to-r from-[#b8baf5] via-[#b9b3f1] to-[#d371ae] p-8 rounded-xl shadow-lg">
      {/* Left Section */}
      <div className="lg:w-[45%] flex flex-col justify-center p-4">
        <h2 className="text-4xl font-bold text-main">
         GRAND OPENING
        </h2>
        <p className="text-base  mt-4 text-gray-600 font-semibold ">
          ISKCON Vrindavan cordially invites you for the celebration of the
          fiftieth anniversary of the Grand Opening of the Sri Sri
          Krishna-Balarama Mandir on Rama Navami, April 6<sup>th</sup>, 2025.
        </p>
        <div className="mt-6 flex items-center">
          <div className="bg-white rounded-full flex items-center gap-2 px-4 py-2">
            <svg
              className="w-6 h-6 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-6 8h6m4 0h.01M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
              />
            </svg>
            <p> 1<sup>st</sup> April – 6<sup>th</sup> April 2025</p>
          </div>
        </div>
        <button className="mt-6 w-[180px] px-2 py-2 bg-main text-white rounded-full hover:bg-main">
          Know More
        </button>
      </div>

       {/* middle section*/}

        <div>
        <Image
          src="/images/ceremony2.png" // Placeholder for the golden jubilee image
          alt="Golden Jubilee"
          width={300}
          height={300}
          className="mb-4"
        />
        </div>
      {/* Right Section */}
      <div className="flex items-center p-4">
        {/* Golden Jubilee Image */}
        

        {/* Events List */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">ALL EVENTS</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-4">
              <div className="bg-main text-white p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-6 8h6m4 0h.01M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">50<sup>th</sup> Grand Opening</p>
                <p className="text-sm text-gray-500">1<sup>st</sup> April – 6<sup>th</sup> April 2025</p>
              </div>
            </li>

            <li className="flex items-center space-x-4">
              <div className="bg-main text-white p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-6 8h6m4 0h.01M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Karttika Vraja Parikrama</p>
                <p className="text-sm text-gray-500">18<sup>th</sup> Oct – 13<sup>th</sup> Nov 2024</p>
              </div>
            </li>

            <li className="flex items-center space-x-4">
              <div className="bg-main text-white p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-6 8h6m4 0h.01M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">84 Kos Vraj Mandal Parikrama</p>
                <p className="text-sm text-gray-500">16<sup>th</sup> Oct – 15<sup>th</sup> Nov 2024</p>
              </div>
            </li>

            <li className="flex items-center space-x-4">
              <div className="bg-main text-white p-2 rounded-full">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-6 8h6m4 0h.01M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">Rama Ekadasi</p>
                <p className="text-sm text-gray-500">28<sup>th</sup> October 2024 (Monday)</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
