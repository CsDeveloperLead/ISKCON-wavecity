import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-[300px] bg-cover bg-center bg-[linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0)),url('/images/navbg.png')] px-4 md:px-20 font-montserrat relative z-10">
      <div className="pt-6">
        <div className="w-full  flex items-center justify-between">
          <div className="flex justify-center items-center">
            <Image src="/images/logo.png" width={120} height={100} alt="logo" />
          </div>
          <div className="w-[60%]  justify-between hidden md:flex ">
            <Link href="/">
              <div className="text-2xl leading-[49px] font-extrabold text-white hover:text-gray-400 gradient-text">
                Home
              </div>
            </Link>
            <Link href="/about">
              <div className="text-2xl leading-[49px] font-extrabold gradient-text">
                About Us
              </div>
            </Link>
            <Link href="/construction">
              <div className="text-2xl leading-[49px] font-extrabold gradient-text">
                Construction
              </div>
            </Link>
            <Link href="/donation">
              <div className="text-2xl leading-[49px] font-extrabold gradient-text">Donate</div>
            </Link>
            <Link href="/contact">
              <div className="text-2xl leading-[49px] font-extrabold gradient-text">
                Contact
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
