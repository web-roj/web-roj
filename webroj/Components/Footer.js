import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
// Import a from react-router-dom
import logo from '../Images/logo.png'
import Image from 'next/image';
const Footer = () => {
    return (
        <div className="bg-[#F4F8FC] text-gray-800 ">
            <footer className="flex flex-col p-6 md:flex-row md:justify-around md:p-12">
                <div className="flex-1 max-w-full md:max-w-[25%] p-4">
                <Image 
                    src={logo} // Display the first uploaded logo
                    alt={logo} // Alternative text for the logo
                    className='h-10 mb-2 cursor-pointer md:w-28 lg:w-40 w-28 md:h-12'
                    width={160} // Adjust width as necessary
                    height={40} // Adjust height as necessary
                />
                    <p className="mb-4 font-bold text-gray-700">We are committed to providing the best products and services to our customers. Connect with us on social media.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-700 text-xl md:text-2xl hover:text-[#EF2B73] transition-colors"><FaFacebookF /></a>
                        <a href="#" className="text-gray-700 text-xl md:text-2xl hover:text-[#EF2B73] transition-colors"><FaTwitter /></a>
                        <a href="#" className="text-gray-700 text-xl md:text-2xl hover:text-[#EF2B73] transition-colors"><FaInstagram /></a>
                        <a href="#" className="text-gray-700 text-xl md:text-2xl hover:text-[#EF2B73] transition-colors"><FaLinkedin /></a>
                    </div>
                </div>
                <div className="flex-1 max-w-full md:max-w-[25%] p-4">
                    <h3 className="pl-2 mb-4 text-xl font-bold border-l-4 border-[#EF2B73] md:text-2xl md:pl-4">Our <span className="text-[#EF2B73]">Company</span></h3>
                    <ul className="space-y-2">
                        <li><a href="/about-us" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />About Us</a></li>
                        <li><a href="/career" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Careers</a></li>
                      
                        <li><a href="/blog" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Blog</a></li>
                        <li><a href="/contact-us" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Contact Us</a></li>
                        <li><a href="/portfolio" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Our Portfolio</a></li>
                        <li><a href="/training-internship" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Training & Internship</a></li>
                    </ul>
                </div>
                <div className="flex-1 max-w-full md:max-w-[25%] p-4">
                    <h3 className="pl-2 mb-4 text-xl font-bold border-l-4 border-[#EF2B73] md:text-2xl md:pl-4">Our <span className="text-[#EF2B73]">Services</span></h3>
                    <ul className="space-y-2">
                        <li><a href="/ai-ml" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Ai & Ml</a></li>
                        <li><a href="/android-ios" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Android & Ios</a></li>
                        <li><a href="/web-development" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Web Development</a></li>
                        <li><a href="/custom-software" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Custom Software</a></li>
                        <li><a href="/digital-marketing" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Digital Marketing</a></li>
                        <li><a href="/cloud-solutions" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />cloud Solutions</a></li>
                        <li><a href="/graphics-animations" className="text-gray-700 font-bold hover:text-[#EF2B73] hover:underline"><FaChevronRight className="inline mr-2" />Graphics & Animations</a></li>
                    </ul>
                </div>
                <div className="flex-1 max-w-full md:max-w-[25%] p-4">
                    <h3 className="pl-2 mb-4 text-xl font-bold border-l-4 border-[#EF2B73] md:text-2xl md:pl-4">Contact <span className="text-[#EF2B73]">Us</span></h3>
                    <p className="flex items-center text-gray-700 font-bold mb-3 hover:text-[#EF2B73]"><FaMapMarkerAlt className="mr-2" /> A-62 Sector-2, Noida, UP(201301) </p>
                    <p className="flex items-center text-gray-700 font-bold mb-3 hover:text-[#EF2B73]"><FaPhone className="mr-2" />+91 8287212406</p>
                    <p className="flex items-center text-gray-700 font-bold hover:text-[#EF2B73]"><FaEnvelope className="mr-2" /> info@webroj.com</p>
                </div>
            </footer>
            <div className="py-4 font-bold text-center text-gray-700 border-t border-gray-300">
                <p>&copy; 2024 webroj-software company. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
