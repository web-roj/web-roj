import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStar, FaStarHalfAlt, FaRegStar, FaFacebookF, FaTwitter, FaInstagram, FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/config';



const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <>
            {Array(fullStars).fill(<FaStar className="text-yellow-400 mx-0.5" />)}
            {halfStars === 1 && <FaStarHalfAlt className="text-yellow-400 mx-0.5" />}
            {Array(emptyStars).fill(<FaRegStar className="text-yellow-400 mx-0.5" />)}
        </>
    );
};

// Custom Arrow components
const PrevArrow = ({ onClick }) => (
    <button onClick={onClick} className="absolute left-[-24px] z-10 h-16 p-2 text-white bg-[#fc005f] rounded-md shadow-lg top-[102px] ">
        <FaChevronLeft />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button onClick={onClick} className="absolute right-[-24px] z-10 p-2 text-white bg-[#fc005f] h-16 rounded-md shadow-lg top-[102px]">
        <FaChevronRight />
    </button>
);

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const reviewCollection = collection(db, 'reviews'); // Replace 'reviews' with your collection name
          const reviewSnapshot = await getDocs(reviewCollection);
          const reviewList = reviewSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setReviews(reviewList);
        } catch (error) {
          console.error("Error fetching reviews: ", error);
        }
      };
  
      fetchReviews();
    }, []);
  
    const renderRating = (rating) => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <span key={i} className={`text-lg ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
        );
      }
      return <div className="flex">{stars}</div>;
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="px-6 py-10 text-center">
            <h2 className="mb-5 text-2xl font-bold md:text-4xl">Customer <span className='text-[#fc005f]'>Reviews</span></h2>
            <p className="mx-auto mb-10 text-sm leading-6 text-justify text-gray-600 lg:px-10 md:px-10 md:text-base">
                Our clients consistently praise our exceptional service and innovative solutions. They highlight our ability to deliver projects on time and within budget, as well as our team's expertise and dedication. Many commend our seamless integration of new technologies and our responsive 24/7 support. Their testimonials reflect our commitment to driving their success through reliable, cutting-edge IT solutions.
            </p>
            <div className="relative">
      <Slider {...settings} className="px-2">
        {reviews.map((review, index) => (
          <div key={index} className="px-2">
            <div className="p-5 text-center transition-transform duration-300 ease-in-out rounded-lg bg-gradient-to-br from-pink-500 to-red-500 hover:from-purple-500 hover:to-blue-500">
              <img src={review.imageUrl} alt={review.name} className="w-16 h-16 mx-auto mb-3 rounded-full" />
              <h3 className="mb-2 text-xl font-bold text-white">{review.name}</h3>
              <p className="mb-3 text-base text-white">{review.description}</p>
              <div className="flex justify-center mb-3">
                {renderRating(review.rating)}
              </div>
              <div className="flex justify-center space-x-4 text-white">
                <a href={review.social?.facebook} className="text-xl hover:text-blue-600"><FaFacebookF /></a>
                <a href={review.social?.twitter} className="text-xl hover:text-blue-400"><FaTwitter /></a>
                <a href={review.social?.instagram} className="text-xl hover:text-pink-500"><FaInstagram /></a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
        </div>
    );
};

export default CustomerReviews;
