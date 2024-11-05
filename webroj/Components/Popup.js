import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMailBulk, FaMapMarker, FaPhone, FaUser, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import dummy from '../Images/teams.JPG';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/Firebase/config'; // Import Firestore instance
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true); // Default to true to show popup on page load
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateForm = () => {
    // Check if any field is empty
    if (!firstName || !lastName || !phoneNumber || !email || !message) {
      toast.error("Please fill in all fields."); // Show error toast
      return false;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address."); // Show error toast
      return false;
    }
    return true; // All validations passed
  };

  const sendDataToFirestore = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) return; // Validate form before submission

    try {
      // Add form data to Firestore
      await addDoc(collection(db, 'contacts'), {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        email: email,
        message: message,
        timestamp: new Date(),
      });

      toast.success("Your message has been sent!"); // Show success toast
      resetForm(); // Reset the form after storing
    } catch (error) {
      console.error('Error writing document: ', error);
      toast.error("There was an error sending your message."); // Show error toast
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setMessage('');
    setIsOpen(false); // Close the modal
  };

  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex flex-col w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg md:flex-row md:p-6"
        initial={{ scale: 0.9 }}
        animate={{ scale: isOpen ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Get In Touch Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-2 mb-4 text-white bg-blue-500 rounded-md md:hidden"
        >
          Get In Touch
        </button>

        {/* Popup modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50 md:p-0">
            <div className="relative w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg lg:p-6">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-[1px] text-4xl text-red-500 lg:text-4xl md:text-3xl right-2 hover:text-red-700"
              >
                &times;
              </button>

              {/* Popup Content */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Left side form */}
                <div>
                  <h2 className="mb-4 text-3xl font-bold text-center lg:text-left">
                    Get In <span className="text-[#fc005f]">Touch</span>
                  </h2>
                  <p className="mb-6 text-center text-gray-600 lg:text-left">We are here for you! How can we help?</p>
                  
                  <form className="space-y-4" onSubmit={sendDataToFirestore}>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                        />
                        <span className="absolute inset-y-0 flex items-center text-[#fc005f] left-3">
                          <FaUser />
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                        />
                        <span className="absolute inset-y-0 flex items-center text-[#fc005f] left-3">
                          <FaUser />
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                   

                      <div className="relative mt-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                        />
                        <span className="absolute inset-y-0 flex items-center text-[#fc005f] left-3">
                          <FaEnvelope />
                        </span>
                      </div>

                      <div className="relative mt-2">
                        <span className="absolute inset-y-0 flex items-center text-[#fc005f] left-3">
                          <FaPhone />
                        </span>
                        <PhoneInput
                          country={'us'}
                          value={phoneNumber}
                          onChange={setPhoneNumber}
                          inputStyle={{
                            width: '100%',
                            paddingLeft: '2.5rem',
                            paddingRight: '1rem',
                            borderRadius: '0.375rem',
                            border: '1px solid #D1D5DB',
                            height: '3rem',
                          }}
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        placeholder="Go ahead, we are listening..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 font-bold text-white rounded-md bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-500 hover:scale-105 hover:shadow-lg"
                    >
                      Submit
                    </button>
                  </form>
                </div>

                {/* Right side contact details */}
                <div className="hidden lg:block ">
                 <div className="mt-4">
                 <div className="flex flex-col items-center justify-center py-6 space-y-2 border border-pink-300 rounded-md shadow-md hover:shadow-pink-600">
                    {/* Image Section */}
                    <Image src={dummy} alt="Contact Image" className="mx-auto" />
                 <div className="grid grid-cols-2 gap-4">
            

                    {/* Address and Phone */}
                   
                    <p className="flex items-center p-2 text-gray-600 font-bold rounded-md shadow-sm shadow-[#fc005f]">
                      <FaMailBulk className="mr-2 text-[#fc005f]"  /> info@webroj.com
                    </p>
                   
                    
                    <div className="flex justify-center p-3 space-x-4 font-bold rounded-md shadow-sm shadow-[#fc005f]">
                      <a href="#" className="text-[#fc005f]">
                        <FaFacebookF />
                      </a>
                      <a href="#" className="text-[#fc005f]">
                        <FaInstagram />
                      </a>
                      <a href="#" className="text-[#fc005f]">
                        <FaLinkedinIn />
                      </a>
                      <a href="#" className="text-[#fc005f]">
                        <FaYoutube />
                      </a>
                    </div>
                 </div>
                  </div>
                 </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Popup;
