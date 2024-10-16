import Image from "next/image";
import Link from "next/link";
import MainNavbar from "../Components/MainNavbar";
import { Plus_Jakarta_Sans } from 'next/font/google';
import Footer from "../Components/Footer";

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
  },
  {
    id: 5,
    title: "Gau Seva",
    description:
      "optimise your onboarding process and give your employee satisfaction dkj",
    image: "/images/navbg.png", // Example image URL, change as needed
  },
  {
    id: 6,
    title: "Feast Sponsorship",
    description:
      "optimise your onboarding process and give your employee satisfaction dkj",
    image: "/images/navbg.png", // Example image URL, change as needed
  },
  {
    id: 7,
    title: "Nitya Seva",
    description:
      "optimise your onboarding process and give your employee satisfaction dkj",
    image: "/images/navbg.png", // Example image URL, change as needed
  },
  {
    id: 8,
    title: "Gita Daan Seva",
    description:
      "optimise your onboarding process and give your employee satisfaction dkj",
    image: "/images/navbg.png", // Example image URL, change as needed
  },
];

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'], // Customize weights as needed
  style: ['normal', 'italic'], // Optional, for italic styles
  display: 'swap', // Control font display behavior
});
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
    {/* <p className="text-gray-500 h-[100px] text-sm text-center">{description}</div> */}

    <button className="bg-main text-white text-sm font-semibold w-[90%] py-2 rounded-md my-4">
      <Link href={`/donation/${id}`}>
        Donate Now 
      </Link>
    </button>
    
  </div>
  );
};

const Page = () => {
  return (
    <div className={jakarta.className}>
    <div className="mx-28 relative h-full ">
      <MainNavbar />
      <div className="w-full ">
        {/* <div className="relative">
          <div className="pt-10 md:pt-40 flex flex-col-reverse md:flex-row justify-between items-center">
            <div className="w-full md:w-[50%] px-4 md:pl-20 flex flex-col gap-6 ">
              <p className="gradient-text2 text-4xl mt-6 md:mt-0 font-extrabold ">
                Iscon Wavecity Gaziabad
              </div>
              <h1 className="text-4xl md:text-7xl text-center md:text-start leading-6 md:leading-10 font-bold text-[#665f5f]">
                Donate to construct
              </h1>
              <h2 className="text-3xl md:text-6xl leading-6 md:leading-10 text-center md:text-start font-bold text-[#665f5f]">
                This Radha Krishna Temple
              </h2>
              <h3 className="text-[#665f5f] text-xl md:text-2xl text-center md:text-start font-bold">
                ISKCON Ghaziabad is a Hare Krishna temple, community, and ashram
                dedicated to the practice of bhakti-yoga or loving service to
                Krishna, the Supreme Personality of Godhead.
              </h3>
            </div>
            <div className="w-[90%] md:w-[50%]  flex justify-center items-center ">
              <div className="absolute right-0">
                <Image
                  src="/images/bgdonation.png"
                  width={1000}
                  height={400}
                  alt="temple"
                  className="opacity-60"
                />
              </div>
              <div className="relative rounded-3xl w-[500px] h-[400px] p-[3px] bg-gradient-to-b from-gradient-end to-gradient-start">
                <div className="flex items-center justify-center h-full bg-white rounded-3xl"></div>
              </div>{" "}
            </div>
          </div>
        </div> */}
        <div className="w-full flex justify-center my-20">
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
    </div>
    <div>
      <Footer />
    </div>
    </div>
  );
};

export default Page;
