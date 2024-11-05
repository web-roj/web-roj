import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import comp1 from '../Images/comp1.png';
import comp2 from '../Images/comp2.png';
import comp3 from '../Images/comp3.png';
import comp4 from '../Images/comp4.png';
import comp5 from '../Images/comp5.png';
import comp6 from '../Images/comp6.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import Image from "next/image";
import { db } from "@/Firebase/config";
import { collection, getDocs } from "firebase/firestore";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-16px] h-16 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white bg-[#fc005f] rounded-md shadow-lg"
  >
    <FaChevronLeft />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-16px] top-1/2 h-16 transform -translate-y-1/2 z-10 p-2 text-white bg-[#fc005f] rounded-md shadow-lg"
  >
    <FaChevronRight />
  </button>
);

function CompanySlider() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Fetch companies from Firestore
  const fetchCompanies = async () => {
    try {
      const companyRef = collection(db, 'companies');
      const companySnapshot = await getDocs(companyRef);
      const companyList = companySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompanies(companyList);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative px-4 mt-12 mb-6">
    <Slider {...settings}>
      {companies.map((company, index) => (
        <div 
          key={index} 
          className="flex items-center justify-center w-64 h-20 p-4 rounded-lg"
        >
          {/* Company logo and link */}
          <a href={company.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full h-full">
            <Image
              src={company.logoUrl}
              alt={`Company ${index + 1}`}
              width={180} // Adjusted image width
              height={100} // Adjusted image height
              className="object-contain"
            />
          </a>
        </div>
      ))}
    </Slider>
  </div>
  
  );
}

export default CompanySlider;
