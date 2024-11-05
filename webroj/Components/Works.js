import React from "react";
import Upwork from "../Images/Upwork.png";
import Fiverr from "../Images/fiverr.png";
import Amazon from "../Images/amazon.png";
import Shopify from "../Images/Shopify.png";
import Facebook from "../Images/Facebook.png";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Works = () => {
  return (
    <div className="flex flex-col items-center p-4 mx-auto lg:flex-row lg:h-screen lg:px-12" id="works">
      {/* Left side */}
      <div className="relative flex flex-col items-start lg:w-1/2">
        <span className="text-4xl font-bold text-black">Works for All these</span>
        <span className="text-4xl font-bold text-orange-500">Brands & Clients</span>
        <p className="text-gray-500 mt-4 leading-6 lg:w-[30rem]">
          <b>Webroj</b> specializes in delivering innovative and tailored technology solutions to meet our clients' unique business needs. Our expertise spans web and mobile application development, cloud services, and data management, ensuring top-notch performance and reliability. We pride ourselves on fostering strong, collaborative relationships, and driving success through cutting-edge technology and unparalleled support. Partner with us to transform your digital landscape and achieve your strategic goals.
        </p>
        <Link href="/contact">
          <button className="px-4 py-2 mt-8 text-white bg-orange-500 rounded-md hover:bg-orange-600">
            Hire Me
          </button>
        </Link>
        <div className="absolute w-32 h-32 bg-blue-300 rounded-full opacity-50 top-10 right-10 blur-lg"></div>
      </div>

      {/* Right side */}
      <div className="relative flex items-center justify-center mt-8 lg:w-1/2 lg:mt-0">
        <motion.div
          initial={{ rotate: 45 }}
          whileInView={{ rotate: 0 }}
          viewport={{ margin: "-40px" }}
          transition={{ duration: 3.5, type: "spring" }}
          className="relative flex items-center justify-center w-[18rem] h-[18rem]"
        >
          {/* Center Facebook logo */}
          <div className="relative flex items-center justify-center w-32 h-32 bg-white border-4 border-gray-200 rounded-full shadow-lg">
            <Image src={Facebook} alt="Facebook" className="object-contain w-3/4 h-3/4" />
          </div>

          {/* Circular arrangement of other logos */}
          {[Upwork, Fiverr, Amazon, Shopify].map((logo, index) => (
            <div
              key={index}
              className="absolute flex items-center justify-center w-24 h-24 bg-white border-4 border-gray-200 rounded-full shadow-lg"
              style={{
                transform: `rotate(${index * 90}deg) translateX(7rem) rotate(-${index * 90}deg)`,
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              <Image src={logo} alt={`logo-${index}`} className="object-contain w-3/4 h-3/4" />
            </div>
          ))}
        </motion.div>

        {/* Background Circles */}
        <div className="absolute top-0 left-0 rounded-full opacity-50 w-52 h-52 bg-gradient-to-r from-pink-500 to-red-500 blur-lg"></div>
        <div className="absolute top-0 right-0 rounded-full opacity-50 w-52 h-52 bg-gradient-to-r from-purple-500 to-blue-500 blur-lg"></div>
        <div className="absolute bottom-0 left-0 rounded-full opacity-50 w-52 h-52 bg-gradient-to-r from-purple-500 to-blue-500 blur-lg"></div>
        <div className="absolute bottom-0 right-0 rounded-full opacity-50 w-52 h-52 bg-gradient-to-r from-pink-500 to-red-500 blur-lg"></div>
      </div>
    </div>
  );
};

export default Works;
