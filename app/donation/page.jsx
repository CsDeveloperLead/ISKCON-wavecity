
import Navbar from "@/Components/Navbar";
import Image from "next/image";
import Link from "next/link";
const data = [
  {
    id: 1,
    title: 'Shri Krishna Janmashtmi Seva',
    description: 'optimise your onboarding process and give your employee satisfaction dkj',
    image: '/images/navbg.png', // Example image URL, change as needed
  },
  {
    id: 2,
    title: 'Bhraman Bhojan Seva',
    description: 'optimise your onboarding process and give your employee satisfaction dkj',
    image: '/images/navbg.png', // Example image URL, change as needed
  },
  {
    id: 3,
    title: 'Anna Daan Seva',
    description: 'optimise your onboarding process and give your employee satisfaction dkj',
    image: '/images/navbg.png', // Example image URL, change as needed
  },
  {
    id: 4,
    title: 'Shri Krishna Janmashtmi Seva',
    description: 'optimise your onboarding process and give your employee satisfaction dkj',
    image: '/images/navbg.png', // Example image URL, change as needed
  },
  {
    id: 5,
    title: 'Bhraman Bhojan Seva',
    description: 'optimise your onboarding process and give your employee satisfaction dkj',
    image: '/images/navbg.png', // Example image URL, change as needed
  },
  {
    id: 6,
    title: 'Anna Daan Seva',
    description: 'optimise your onboarding process and give your employee satisfaction dkj',
    image: '/images/navbg.png', // Example image URL, change as needed
  },
];

const Card = ({ title, description, image,id }) => {
  return (
    <div className="w-[350px] h-auto flex flex-col items-center  bg-[url('/images/cardbg.png')] rounded-2xl shadow-[4px_6px_4.5px_0px_rgba(0,0,0,0.25)] p-5">
      <div className="w-full h-[200px] bg-gray-200 rounded-xl mb-4">
        {/* Image placeholder */}
        <Image src={image} alt={title} className="w-full h-full object-cover rounded-xl" width={2000} height={2000} />
      </div>
      <h3 className="text-3xl text-center w-2/3 h-[80px] font-bold mb-2">{title}</h3>
      <p className="text-gray-500 h-[100px] text-center">{description}</p>
      
      <button className="bg-gradient-to-r from-[#873C28] to-[#CD531F] text-white w-[90%] py-2 rounded-3xl">
      <Link href={`/donation/${id}`}>
        Donate Now <span aria-hidden="true">→</span>
        </Link>
      </button>
     
    </div>
  );
};

const Page = () => {
  return (
    <div className="relative h-full">
      <Navbar />
      <div className="w-full bg-white rounded-tl-[50px] md:rounded-tl-[100px] rounded-tr-[50px] md:rounded-tr-[100px] absolute top-[140px] z-50 font-oc-pajaro">
        <div className="relative">
        <div className="pt-10 md:pt-40 flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="w-full md:w-[50%] px-4 md:pl-20 flex flex-col gap-6 ">
            <p className="gradient-text2 text-4xl mt-6 md:mt-0 font-extrabold ">
              Iscon Wavecity Gaziabad
            </p>
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
           <Image src="/images/bgdonation.png" width={1000} height={400} alt="temple" className='opacity-60' />
          </div>
            <div className="relative rounded-3xl w-[500px] h-[400px] p-[3px] bg-gradient-to-b from-gradient-end to-gradient-start">
              <div className="flex items-center justify-center h-full bg-white rounded-3xl">
                
              </div>
            </div>{" "}
          </div>
          
        </div>
      
      </div>
      <div className="border-b-[11px] border-[#C7BFBF] mt-[50px] md:mt-[180px] md:mx-20 mx-4 rounded-3xl"></div>
      <div className="w-full md:px-20 flex justify-center my-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
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
  );
};

export default Page;
