"use client";

import { useParams } from "next/navigation"; // Import useParams from next/navigation
import React from "react";
import Image from "next/image";
import Navbar from "@/Components/Navbar";
import ProgressBar from "@/Components/ProgressBar";
import { FaLocationDot } from "react-icons/fa6";

const data = [
  {
    id: 1,
    title: "Shri Krishna Janmashtmi Seva",
    description:
      "Optimise your onboarding process and give your employee satisfaction.",
    image: "/images/logo.png",
    address: "Wave City, Ghaziabad",
  },
  {
    id: 2,
    title: "Bhraman Bhojan Seva",
    description:
      "Optimise your onboarding process and give your employee satisfaction.",
    image: "/images/logo.png",
    address: "Wave City, Ghaziabad",
  },
  {
    id: 3,
    title: "Anna Daan Seva",
    description:
      "Optimise your onboarding process and give your employee satisfaction.",
    image: "/images/logo.png",
    address: "Wave City, Ghaziabad",
  },
  {
    id: 4,
    title: "Shri Krishna Janmashtmi Seva",
    description:
      "optimise your onboarding process and give your employee satisfaction dkj",
    image: "/images/navbg.png", // Example image URL, change as needed
    address: "Wave City, Ghaziabad",
  },
  {
    id: 5,
    title: "Bhraman Bhojan Seva",
    description:
      "optimise your onboarding process and give your employee satisfaction dkj",
    image: "/images/navbg.png", // Example image URL, change as needed
    address: "Wave City, Ghaziabad",
  },
  {
    id: 6,
    title: "Anna Daan Seva",
    description:
      "optimise your onboarding process and give your employee satisfaction dkj",
    image: "/images/navbg.png", // Example image URL, change as needed
    address: "Wave City, Ghaziabad",
  },
];

const CardDetails = () => {
  const params = useParams(); // Get the dynamic id using useParams
  const { id } = params; // Extract the id from params
  const raisedAmount = 80050; // You can update this dynamically
  const goalAmount = 90000; // Set your goal here

  // Find the card by id
  const card = data.find((item) => item.id === Number(id));

  // Handle case where card is not found (e.g., invalid id)
  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="relative h-full">
      <Navbar />
      <div className="w-full bg-white rounded-tl-[50px] md:rounded-tl-[100px] rounded-tr-[50px] md:rounded-tr-[100px] absolute top-[140px] z-50 font-oc-pajaro">
        <div className="relative">
          <div className="w-full flex-col gap-4 md:gap-8 flex items-center justify-center">
            <p className="gradient-text2 text-4xl mt-10 md:mt-32 font-extrabold ">
              Iscon Wavecity Gaziabad
            </p>
            <h1 className="text-[#665f5f] text-4xl md:text-7xl text-center font-bold leading-8 md:leading-10">
              {card.title}{" "}
            </h1>
            <p className="text-[#665f5f] text-xl text-center">
              {card.description}
            </p>
          </div>

          <div className="w-full md:w-[50%] mt-[20px] flex justify-center items-center ">
            <div className="absolute right-0">
              <Image
                src="/images/bgdonation.png"
                width={1000}
                height={400}
                alt="temple"
                className="opacity-40"
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between px-4 md:px-20 mt-8 md:mt-28">
            <div className="w-full md:w-[70%] flex flex-col gap-4">
              <div className="w-full h-[400px] rounded-3xl bg-[#c4c4c4] z-20">
                {/* <Image src={card.image} alt={card.title} width={2000} height={2000}  className="w-full h-full object-contain"/> */}
              </div>
              <div className="w-full">
                <ProgressBar raised={raisedAmount} goal={goalAmount} />
              </div>
              <div  className="flex flex-col gap-4">
                <h1 className="text-[#c24f20] text-xl md:text-4xl text-center md:text-start font-bold">There are many variations of passages of available but majority have alteration</h1>
                <p className="text-[#868388] text-base md:text-lg text-center md:text-start md:leading-8">Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <p className="text-[#868388] text-base md:text-lg text-center md:text-start md:leading-8">When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining</p>
              </div>
              <div  className="flex flex-col gap-4 mt-4 mb-20">
                <h1 className="text-[#c24f20] text-xl md:text-4xl text-center md:text-start font-bold">Why Donate with clean heart</h1>
                <p className="text-[#868388] text-base md:text-lg text-center md:text-start md:leading-8">Neque porro est qui dolorem ipsum quia quaed inventor veritatis et quasi architecto beatae vitae dicta sunt explicabo. Aelltes port lacus quis enim var sed efficitur turpis gilla sed sit amet finibus eros. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>
            </div>
            <div className="w-[95%] md:w-[25%] flex flex-col items-center gap-10">
              <div className="bg-[#efece7] rounded-3xl p-6 w-full z-50">
                <h3 className="text-xl md:text-2xl font-bold text-[#665f5f] text-center">{card.title} - Wave City, Ghaziabad</h3>
                <p className="border-b border-[#D7D3CB] my-3"></p>
                <div className="flex flex-col gap-2 ">
                  <p className="flex gap-2 items-center text-[#665f5f] text-base md:text-xl"><span className="text-red-500"><FaLocationDot size={20}/></span> <span className="text-base md:text-xl font-bold">Address : </span>{card.address}</p>
                  <p className="flex gap-2 items-center text-[#665f5f] text-base md:text-xl"><span className="text-red-500"><FaLocationDot size={20}/></span> <span className="text-base md:text-xl font-bold">Address : </span>{card.address}</p>
                  <p className="flex gap-2 items-center text-[#665f5f] text-base md:text-xl"><span className="text-red-500"><FaLocationDot size={20}/></span> <span className="text-base md:text-xl font-bold">Address : </span>{card.address}</p>
                </div>
              </div>
              <div className="bg-[#efece7] rounded-3xl p-6 w-full mb-10 md:mb-0  z-50">
                <h3 className="text-xl md:text-2xl font-bold text-[#665f5f] text-center">Other Donations</h3>
                <p className="border-b border-[#D7D3CB] my-3"></p>
                <div className="flex flex-col gap-2  ">
                  <p className="flex gap-2 items-center text-[#665f5f] text-base md:text-xl"> {card.address}</p>
                  <p className="flex gap-2 items-center text-[#665f5f] text-base md:text-xl"> {card.address}</p>
                  <p className="flex gap-2 items-center text-[#665f5f] text-base md:text-xl"> {card.address}</p>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="h-[400px] bg-gray-200 rounded-xl mb-4">
          <Image 
            src={card.image} 
            alt={card.title} 
            className="w-full h-full object-cover rounded-xl" 
            width={1000} 
            height={1000} 
          />
        </div>
        <h3 className="text-3xl font-bold mb-2">{card.title}</h3>
        <p className="text-gray-500 mb-4">{card.description}</p>
      </div> */}
    </div>
  );
};

export default CardDetails;
