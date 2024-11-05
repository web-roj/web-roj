import React, { useEffect, useState } from 'react';
import progress from "../Images/contact.png"
import { FaChartPie, FaClipboardList, FaHeadset, FaLongArrowAltRight, FaRobot } from 'react-icons/fa';
import story from '../Images/story.webp';
import values from '../Images/values.webp';
import achievements from '../Images/achievements.webp';
import vision from '../Images/vision.webp';
import { FaSearch, FaCogs, FaBullseye, FaChartLine } from 'react-icons/fa';

import welcome from '../Images/welcome.png';


import Link from 'next/link';
import Ourclients from '@/Components/Ourclients';
import CompanySlider from '@/Components/CompanySlider';
import { getDocs, collection } from 'firebase/firestore';

import Image from 'next/image';
import { db } from '@/Firebase/config';
import Head from 'next/head';


const About = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'banners'));
            const bannersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            
            // Filter banners based on the "About Us" category
            const aboutUsBanners = bannersData.filter(banner => banner.category === "salesforce");
            
            setBanners(aboutUsBanners);
          } catch (error) {
            console.error("Error fetching banners:", error);
          }
        };
    
        fetchBanners();
      }, []);
    
    

    const handleReadMore = () => {
        setIsExpanded(!isExpanded);
    };
    
    const steps = [
        {
          id: 1,
          title: 'Lead Management',
          description: 'Streamline your lead management processes for better conversion rates.',
          icon: <FaClipboardList className="text-4xl text-pink-600" />
        },
        {
          id: 2,
          title: 'Customer Insights',
          description: 'Leverage data analytics to gain valuable insights about your customers.',
          icon: <FaChartPie className="text-4xl text-pink-600" />
        },
        {
          id: 3,
          title: 'Sales Automation',
          description: 'Automate sales tasks to increase productivity and efficiency.',
          icon: <FaRobot className="text-4xl text-pink-600" />
        },
        {
          id: 4,
          title: 'Service Excellence',
          description: 'Enhance customer service and support with streamlined processes.',
          icon: <FaHeadset className="text-4xl text-pink-600" />
        },
        
      ];
    const [activeTab, setActiveTab] = useState('story');

    const renderContent = () => {
        switch (activeTab) {
            case 'story':
                return (
                    <div className="flex flex-wrap items-center justify-center gap-8 ">
                        <Image src={story} alt="Our Story" className="max-w-[45%] rounded-lg" />
                        <div className="lg:max-w-[50%] md:max-w-[50%] md:px-0 px-6 lg:px-0 text-left">
                            <h2 className="mb-4 text-2xl text-pink-500">Our Story</h2>
                            <p className="text-gray-500">Our journey began with a vision to revolutionize the IT industry... (continue the content)</p>
                        </div>
                    </div>
                );
            case 'values':
                return (
                    <div className="flex flex-wrap items-center justify-center gap-8 ">
                        <Image src={values} alt="Our Values" className="max-w-[45%] rounded-lg" />
                        <div className="lg:max-w-[50%] md:max-w-[50%] md:px-0 px-6 lg:px-0 text-left">
                            <h2 className="mb-4 text-2xl text-pink-500">Our Values</h2>
                            <p className="text-gray-500">At Webroj, our core values guide everything we do... (continue the content)</p>
                        </div>
                    </div>
                );
            case 'achievements':
                return (
                    <div className="flex flex-wrap items-center justify-center gap-8 ">
                        <Image src={achievements} alt="Our Achievements" className="max-w-[45%] rounded-lg" />
                        <div className="lg:max-w-[50%] md:max-w-[50%] md:px-0 px-6 lg:px-0 text-left">
                            <h2 className="mb-4 text-2xl text-pink-500">Our Achievements</h2>
                            <p className="text-gray-500">At Webroj, we take pride in our achievements... (continue the content)</p>
                        </div>
                    </div>
                );
            case 'vision':
                return (
                    <div className="flex flex-wrap items-center justify-center gap-8 ">
                        <Image src={vision} alt="Our Vision" className="max-w-[45%] rounded-lg" />
                        <div className="lg:max-w-[50%] md:max-w-[50%] md:px-0 px-6 lg:px-0 text-left">
                            <h2 className="mb-4 text-2xl text-pink-500">Our Vision</h2>
                            <p className="text-gray-500">At Webroj, our future vision is driven by a commitment... (continue the content)</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="about">
          <Head>
      <title>Salesforce - Webroj Software Company</title>
      <meta name="description" content="Explore how Salesforce can transform your business by enhancing customer relationship management and driving sales performance." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
    <div className="relative flex flex-col md:flex-row">
  {banners.map(banner => (
    <div key={banner.id} className="relative w-full h-[150px] md:h-[200px]"> {/* Set a specific height for mobile */}
      <Image 
        src={banner.url} // Ensure your Firestore has a field named `url`
        alt={banner.category || "Banner"} // Provide alt text if available
        className="w-full h-auto" // Ensure the image takes full width
        layout="fill" // This makes the image cover the container
        objectFit="cover" // Ensures the image covers the entire area
      />
      <div className="absolute text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Link href="/" className="block text-lg font-bold sm:text-2xl lg:text-2xl whitespace-nowrap">
          Home/Salesforce
        </Link>
        <span className="block mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl whitespace-nowrap">Salesforce</span>
      </div>
    </div>
  ))}
</div>




            {/* Welcome, HowItWorks, and Other Sections */}
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
            {/* <Welcome/> */}
            {/* <HowItWorks /> */}
            <div className="mb-3 text-center">
  <h2 className="mb-8 text-2xl font-bold text-gray-800 lg:text-4xl md:text-4xl sm:text-3xl">
    Salesforce <span className='text-[#fc005f]'>Solutions</span>
  </h2>
  <div className="flex flex-wrap justify-around gap-6 px-4 sm:px-6 md:px-6 lg:px-8">
    {steps.map((step) => (
      <div key={step.id} className="flex-1 min-w-[280px] max-w-sm border group hover:bg-gradient-to-r from-pink-500 to-red-500 bg-white p-6 sm:p-8 rounded-lg shadow-lg relative">
        <div className="relative mb-4">
          <div className="inline-block p-4 bg-gray-100 rounded-full group-hover:text-white">
            {step.icon}
          </div>
          <div className="absolute top-[-10px] right-[-10px] bg-pink-600 text-white rounded-full px-3 py-1 text-sm font-bold group-hover:text-red-900 group-hover:bg-white">
            {`0${step.id}`}
          </div>
        </div>
        <h3 className="mb-4 text-xl text-gray-800 sm:text-2xl group-hover:text-white">{step.title}</h3>
        <p className="text-sm text-justify text-gray-600 group-hover:text-white sm:text-base">{step.description}</p>
      </div>
    ))}
  </div>
</div>
            {/* Tabs */}
            <div className="w-full mx-auto mt-8 text-center">
    <div className="flex justify-around border-t-2 border-b-2 bg-gradient-to-r from-pink-500 to-orange-500">
        <button
            className={`flex-1 py-4 lg:text-xl md:text-xl text-xs font-bold text-white border-r border-white ${activeTab === 'story' && 'bg-gradient-to-r from-purple-400 to-blue-500'}`}
            onClick={() => setActiveTab('story')}
        >
            Our Story
        </button>
        <button
            className={`flex-1 py-4 font-bold lg:text-xl md:text-xl text-xs text-white border-r border-white ${activeTab === 'values' && 'bg-gradient-to-r from-purple-400 to-blue-500'}`}
            onClick={() => setActiveTab('values')}
        >
            Core Values
        </button>
        <button
            className={`flex-1 py-4 font-bold lg:text-xl md:text-xl text-xs text-white border-r border-white ${activeTab === 'achievements' && 'bg-gradient-to-r from-purple-400 to-blue-500'}`}
            onClick={() => setActiveTab('achievements')}
        >
            Achievements
        </button>
        <button
            className={`flex-1 py-4 font-bold lg:text-xl md:text-xl text-xs text-white ${activeTab === 'vision' && 'bg-gradient-to-r from-purple-400 to-blue-500'}`}
            onClick={() => setActiveTab('vision')}
        >
            Future Vision
        </button>
    </div>
</div>


            {/* Content Section */}
            <div className="py-8">
                {renderContent()}
            </div>

            {/* Additional Components */}
            <Ourclients />
            <CompanySlider />
        </div>
    );
};

export default About;
