import Link from 'next/link';
import React from 'react';
import { FaMobileAlt, FaLock, FaCloud, FaLightbulb, FaCube, FaCode, FaBookReader, FaPaintBrush } from 'react-icons/fa';

const features = [
    { icon: <FaCube/>, title: "Custom Software", desc: "Leverage our expertise in custom software development to create tailored solutions that address your unique business needs and goals.",link:'/custom-software' },
    { icon: <FaCode/>, title: "Web Development", desc: "Build a stunning online presence with our professional web development services. From simple websites to complex web applications, we have the skills and experience to bring your vision to life." },
    { icon: <FaMobileAlt />, title: "Mobile App", desc: "Reach your customers on the go with our cutting-edge mobile app development services. Whether you need an iOS, Android, or cross-platform solution." },
    { icon: <FaLock />, title: "ML & AI", desc: "Our ML and AI services offer tailored solutions to enhance efficiency, drive innovation, and unlock new opportunities for your IT enterprise. We stay updated with the latest advancements in AI and ML." },
    { icon: <FaLightbulb />, title: "Digital Marketing", desc: "Amplify your online presence and reach your target audience with our comprehensive digital marketing services. From SEO and PPC to social media marketing, we can help you attract, engage, more customers online." },
    { icon: <FaCloud />, title: "Cloud Solutions", desc: "Amplify your online presence and reach your target audience with our comprehensive digital marketing services. From SEO and PPC to social media marketing, we can help you attract, engage, more customers online." },
    { icon: <FaPaintBrush/>, title: "Graphics & Animation", desc: "We bring ideas to life with stunning graphics and animation. Our team of talented designers and animators create visually engaging content that tells your story, enhances your brand, and captivates your audience." },
    { icon: <FaBookReader/>, title: "Training & Internship", desc: "Our Professional Development Training Program is designed to equip participants with the essential skills and knowledge needed to excel in their respective fields. This comprehensive program includes:" }
];

const AllFeatures = () => {
    return (
        <div className="px-6 mt-10 text-center lg:mt-10 md:mt-10">
            <h2 className="mb-5 text-2xl font-bold md:text-4xl">All <span className='text-[#fc005f]'>Features</span></h2>
            <p className="mx-auto mb-10 text-base leading-6 text-justify text-gray-600 lg:px-10 md:px-10">
                We provide tailored software development, scalable cloud services, and advanced data management solutions, all fortified with robust cybersecurity measures. Our 24/7 support team ensures seamless operation and quick issue resolution. We specialize in integrating new technologies with existing systems to enhance performance. Partner with us for comprehensive IT solutions that drive business success.
            </p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                  
                     <div key={index} className="flex flex-col items-center p-5 transition-transform duration-300 ease-in-out border border-gray-300 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 hover:from-purple-500 hover:to-blue-500 hover:translate-y-1">
                        <div className="mb-4 text-4xl text-white">
                            {feature.icon}
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                        <p className="text-base leading-6 text-justify text-white">{feature.desc}</p>
                    </div>
                   
                ))}
            </div>
        </div>
    );
};

export default AllFeatures;
