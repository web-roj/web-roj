import React, { useState } from 'react';
import Image from 'next/image';
import welcome from '../Images/welcome.png';

const Welcome = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
       <>
       <div className="px-6 mt-6 text-center ">
                <h1 className="text-2xl font-bold text-gray-800 md:text-4xl">Welcome to our <span className='text-[#fc005f]'>website</span></h1>
                
            </div>
       
        <div className="flex flex-col items-center justify-between px-6 py-1 md:flex-row md:px-6 lg:px-6 ">
           
           <div className="flex-1 mb-6 md:mb-0 md:pr-8 lg:pr-12">
              
               <p className="mb-6 text-sm leading-relaxed text-justify text-gray-600 md:text-base lg:text-base">
                   {isExpanded
                       ? "Discover a world of innovation and creativity. Our website is designed to bring you the latest trends and insights in technology, design, and more. Join our community and be a part of the conversation. We offer a wide range of resources and articles that are sure to inspire and educate. Whether you're looking to stay up-to-date on the latest advancements or simply want to explore new ideas, our platform has something for everyone."
                       : "We believe that technology has the power to transform businesses and reshape industries. As a leading IT company, we specialize in delivering innovative solutions that drive growth, enhance efficiency, and elevate the customer experience. Whether you’re a startup looking to establish your online presence or an enterprise seeking to optimize your IT infrastructure, we have the expertise and resources to help you succeed in today’s digital landscape."
                   }
               </p>
               <button
                   className="px-6 py-3 font-semibold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 hover:scale-105"
                   onClick={handleReadMore}
               >
                   {isExpanded ? 'Read Less' : 'Read More'}
               </button>
           </div>
           <div className="flex-1">
               <Image src={welcome} alt="Welcome" className="rounded-lg" />
           </div>
       </div>
       </>
    );
};

export default Welcome;
