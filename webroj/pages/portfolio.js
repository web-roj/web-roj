import React, { useEffect, useState } from 'react';
import progress from "../Images/contact.png";
import { FaLongArrowAltRight } from 'react-icons/fa';
import Link from 'next/link';
import CompanySlider from '@/Components/CompanySlider';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/config';
import Head from 'next/head';

const imageSrc = 'https://images.pexels.com/photos/14936128/pexels-photo-14936128.jpeg?auto=compress&cs=tinysrgb&w=600';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [banners, setBanners] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'banners'));
        const bannersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBanners(bannersData.filter(banner => banner.category === "portfolio"));
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects')); // Assuming you have a 'projects' collection in Firestore
        const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchBanners();
    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter(project => project.category === selectedCategory);

  return (
    <>
     <Head>
      <title>Portfolio - Webroj Software Company</title>
      <meta name="description" content="Explore our portfolio showcasing innovative projects and successful collaborations that highlight our expertise in software development." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
      <div className="relative flex flex-col md:flex-row">
        {banners.map(banner => (
          <div key={banner.id} className="relative w-full h-[150px] md:h-[200px]">
            <Image 
              src={banner.url} // Ensure your Firestore has a field named `url`
              alt={banner.category || "Banner"}
              className="w-full h-auto"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <Link href="/" className="block text-lg font-bold sm:text-2xl lg:text-2xl whitespace-nowrap">
                Home/Portfolio
              </Link>
              <span className="block mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl whitespace-nowrap">Portfolio</span>
            </div>
          </div>
        ))}
      </div>
      <div className="container px-5 mx-auto mt-4">
        <h2 className="mb-4 text-3xl font-bold text-center">Portfolio</h2>
        <div className="relative w-full overflow-x-scroll lg:hidden md:hidden whitespace-nowrap">
  <div className="flex py-2 mb-4 space-x-4">
    <button
      onClick={() => setSelectedCategory('all')}
      className={`px-4 py-2 text-white rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-blue-400 hover:to-purple-500 ${selectedCategory === 'all' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : ''}`}
    >
      All
    </button>
    <button
      onClick={() => setSelectedCategory('mlai')}
      className={`px-4 py-2 text-white rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-blue-400 hover:to-purple-500 ${selectedCategory === 'mlai' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : ''}`}
    >
      ML & AI
    </button>
    <button
      onClick={() => setSelectedCategory('frontend')}
      className={`px-4 py-2 text-white rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-blue-400 hover:to-purple-500 ${selectedCategory === 'frontend' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : ''}`}
    >
      Front-End
    </button>
    <button
      onClick={() => setSelectedCategory('backend')}
      className={`px-4 py-2 text-white rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-blue-400 hover:to-purple-500 ${selectedCategory === 'backend' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : ''}`}
    >
      Back-End
    </button>
    <button
      onClick={() => setSelectedCategory('digital marketing')}
      className={`px-4 py-2 text-white rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-blue-400 hover:to-purple-500 ${selectedCategory === 'digital marketing' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : ''}`}
    >
      Digital Marketing
    </button>
    <button
      onClick={() => setSelectedCategory('android ios')}
      className={`px-4 py-2 text-white rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-blue-400 hover:to-purple-500 ${selectedCategory === 'android ios' ? 'bg-gradient-to-r from-purple-500 to-blue-500' : ''}`}
    >
      Android & iOS
    </button>
  </div>
</div>

        
        {/* Category buttons */}
        <div className="hidden mb-4 text-center sm:block">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 mx-2 rounded-lg ${selectedCategory === 'all' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-r from-pink-500 to-red-500 text-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory('mlai')}
            className={`px-4 py-2 mx-2 rounded-lg ${selectedCategory === 'mlai' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-r from-pink-500 to-red-500 text-white'}`}
          >
            ML & AI
          </button>
          <button
            onClick={() => setSelectedCategory('frontend')}
            className={`px-4 py-2 mx-2 rounded-lg ${selectedCategory === 'frontend' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-r from-pink-500 to-red-500 text-white'}`}
          >
            Front-End
          </button>
          <button
            onClick={() => setSelectedCategory('backend')}
            className={`px-4 py-2 mx-2 rounded-lg ${selectedCategory === 'backend' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-r from-pink-500 to-red-500 text-white'}`}
          >
            Back-End
          </button>
          <button
            onClick={() => setSelectedCategory('digital marketing')}
            className={`px-4 py-2 mx-2 rounded-lg ${selectedCategory === 'digital marketing' ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white' : 'bg-gradient-to-r from-pink-500 to-red-500 text-white'}`}
          >
            Digital Marketing
          </button>
          <button
            onClick={() => setSelectedCategory('android ios')}
            className={`px-4 py-2 mx-2 rounded-lg ${selectedCategory === 'android ios' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : 'bg-gradient-to-r from-pink-500 to-red-500 text-white'}`}
          >
            Android & iOS
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {filteredProjects.map((project, index) => (
            <div key={index} className="overflow-hidden transition duration-300 transform bg-white border rounded-lg shadow-md hover:scale-105">
             <Link href={project.link}>
             <img src={project.imageUrl} alt={project.name} className="object-fill w-full h-40 border-b" />
              <div className="p-4 text-center">
              <button
           



            className="px-4 py-2 mx-2 text-white rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"
          >
            {project.name}
          </button>
                <p className="mb-4 text-sm text-gray-600">{project.description}</p>
                <Link href={project.link} className="inline-flex items-center text-purple-500 hover:underline">
                  Read More <FaLongArrowAltRight className="ml-2" />
                </Link>
                </div>
             </Link>
            
            </div>
          ))}
        </div>
      </div>
      <CompanySlider />
    </>
  );
};

export default Portfolio;
