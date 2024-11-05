import React, { useState, useEffect } from 'react';
import slider1 from "../Images/slider1.png";
import slider2 from "../Images/slider2.png";
import slider3 from "../Images/slider3.png";
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/config';
import Link from 'next/link';


const Imageslider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
      const fetchSliders = async () => {
        const querySnapshot = await getDocs(collection(db, 'slider'));
        const slidersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSliders(slidersData);
      };
  
      fetchSliders();
    }, [db]);

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % sliders.length); // Loop back to first slide after last
        }, 3000);
        return () => clearInterval(interval);
      }, [sliders.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sliders.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + sliders.length) % sliders.length);
    };

    return (
        <div className="relative w-full mt-1 overflow-hidden rounded-lg mb-">
            <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
      {sliders.map((slide, index) => (
        <div key={index} className="min-w-full">
          <Link href={slide.link} >
            <Image
              src={slide.url} // Use slide.url for the image source
              alt={`Slide ${index + 1}`}
              className="block w-full lg:h-[300px] md:h-[300px] h-auto"
              width={1920}
              height={1080}
              objectFit="cover"
            />
          </Link>
        </div>
      ))}


      </div>
    </div>

            {/* Slider buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
                className="absolute left-0 p-2 transform -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer lg:z-10 top-1/2"
                onClick={goToPrevSlide}
                aria-label="Previous Slide"
            >
                <FaChevronLeft className="text-sm text-black lg:text-xl md:text-xl" />
            </button>
            <button
                className="absolute right-0 p-2 transform -translate-y-1/2 bg-white rounded-full shadow-md cursor-pointer lg:z-10 top-1/2"
                onClick={goToNextSlide}
                aria-label="Next Slide"
            >
                <FaChevronRight className="text-sm text-black lg:text-xl md:text-xl" />
            </button>
            </div>

            {/* Dots navigation */}
            <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
                {sliders.map((_, index) => (
                    <span
                        key={index}
                        className={`block w-2.5 h-2.5 rounded-full cursor-pointer ${index === currentSlide ? 'bg-gradient-to-r from-[#EE5133] to-[#EF2B73]' : 'bg-gray-300'}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Imageslider;
