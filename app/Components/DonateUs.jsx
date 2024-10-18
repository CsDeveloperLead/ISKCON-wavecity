import React from 'react'
import Image from "next/image";
import Link from "next/link";
const data = [
    {
      id: 1,
      title: "Temple Construction",
      description:
        "optimise your onboarding process and give your employee satisfaction dkj",
      image: "/images/navbg.png", // Example image URL, change as needed
    },
    {
      id: 2,
      title: "Sadhu Bhojan Seva",
      description:
        "optimise your onboarding process and give your employee satisfaction dkj",
      image: "/images/navbg.png", // Example image URL, change as needed
    },
    {
      id: 3,
      title: "Food For Life",
      description:
        "optimise your onboarding process and give your employee satisfaction dkj",
      image: "/images/navbg.png", // Example image URL, change as needed
    },
    {
      id: 4,
      title: "Diety Seva Vigraha Seva",
      description:
        "optimise your onboarding process and give your employee satisfaction dkj",
      image: "/images/navbg.png", // Example image URL, change as needed
    }
  ];

  const Card = ({ title, image, id }) => {
    return (
      
     
      <div className="w-[300px] h-auto flex flex-col items-center  bg-white rounded-md shadow-[0_1px_5px_rgba(0,0,0,0.5)] ">
      <div className="w-full h-[200px] bg-gray-200 mb-4">
        {/* Image placeholder */}
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          width={2000}
          height={2000}
        />
      </div>
      <h3 className="text-md text-center text-gray-600 font-bold mb-2">
        {title}
      </h3>
      {/* <p className="text-gray-500 h-[100px] text-sm text-center">{description}</p> */}
  
      <button className="bg-main text-white text-sm font-semibold w-[90%] py-2 rounded-md my-4">
        <Link href={`/donation/${id}`}>
          Donate Now 
        </Link>
      </button>
      
    </div>
    );
  };
const DonateUs = () => {
  return (
    <div className='flex flex-col gap-2 my-20'>
        <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col gap-1">
        <h2 className="text-3xl text-gray-600 font-bold">Donate Us !!</h2>
        <h2 className="text-sm text-gray-600 font-semibold">Your small contribution makes a difference</h2>
        </div>
        
        <button className="px-8 py-3 text-sm font-semibold text-white bg-main rounded-full  hover:bg-blue-800">
         View All
        </button>
      </div>

       <div className="w-full flex justify-center ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {data.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                description={item.description}
                buttonText={item.buttonText}
                image={item.image}
                id={item.id}
              />
            ))}
          </div>
        </div>
    </div>
  )
}

export default DonateUs
