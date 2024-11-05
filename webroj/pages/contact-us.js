import React, { useRef, useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/config';
import Image from 'next/image';
import Link from 'next/link';
import CompanySlider from '@/Components/CompanySlider';
import Head from 'next/head';

const Contact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [banners, setBanners] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch banners for the "Contact Us" section
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'banners'));
        const bannersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const aboutUsBanners = bannersData.filter((banner) => banner.category === 'contactus');
        setBanners(aboutUsBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanners();
  }, []);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = 'First Name is required';
    if (!lastName.trim()) errors.lastName = 'Last Name is required';
    if (!phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!message.trim()) errors.message = 'Message is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit data to Firestore
  const sendDataToFirestore = async (e) => {
    e.preventDefault();

    if (validateForm()) {
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

        toast.success('Form submitted successfully!');
        resetForm();
      } catch (error) {
        console.error('Error writing document: ', error);
        toast.error('Failed to submit form.');
      }
    } else {
      toast.error('Please fill out all required fields correctly.');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  return (
    <>
    <Head>
      <title>Contact Us - Webroj Software Company</title>
      <meta name="description" content="Get in touch with us for hiring opportunities, inquiries, or to learn more about our services. We're here to assist you!" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
      <section className="relative text-center">
        <div className="relative flex flex-col md:flex-row">
          {banners.map((banner) => (
            <div key={banner.id} className="relative w-full h-[150px] md:h-[200px]">
              <Image
                src={banner.url}
                alt={banner.category || 'Banner'}
                layout="fill"
                objectFit="cover"
                className="w-full h-auto"
              />
              <div className="absolute text-center text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <Link href="/" className="block text-lg font-bold sm:text-2xl lg:text-2xl">
                  Home / Contact Us
                </Link>
                <span className="block mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl">Contact Us</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col px-6 mt-6 mb-4 lg:flex-row">
          <div className="hidden lg:w-1/2 lg:pr-4 sm:block">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4279112148374!2d77.31275360888095!3d28.586936975588202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f6005bd213%3A0x4dc8da46969d90b9!2sBlock-A%2C%20A62%2C%20A%20Block%2C%20Sector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1726896367096!5m2!1sen!2sin" width="100%" height="500"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="p-6 mt-8 border border-pink-300 rounded-md shadow-md hover:shadow-pink-500 lg:w-1/2 lg:pl-4 lg:mt-0">
            <div className="max-w-md mx-auto">
              <h2 className="mb-6 text-3xl font-bold text-center text-transparent bg-black bg-clip-text">
                Get in <span className="text-[#fc005f]">Touch</span>
              </h2>
              <form className="space-y-4" onSubmit={sendDataToFirestore}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className={`w-full p-3 pl-10 border ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:border-pink-500`}
                    />
                    <span className="absolute inset-y-0 flex items-center text-[#fc005f] left-3">
                      <FaUser />
                    </span>
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className={`w-full p-3 pl-10 border ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:border-pink-500`}
                    />
                    <span className="absolute inset-y-0 flex items-center text-[#fc005f] left-3">
                      <FaUser />
                    </span>
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              

                  <div className="relative mt-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className={`w-full p-3 pl-10 border ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:border-pink-500`}
                    />
                    <span className="absolute inset-y-0 flex items-center text-[#fc005f] left-3">
                      <FaEnvelope />
                    </span>
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div className="relative mt-2">
                    <span className="absolute inset-y-0 flex items-center text-[#fc005f] left-3">
                      <FaPhone />
                    </span>
                    <PhoneInput
                      country="us"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      inputStyle={{
                        width: '100%',
                        paddingLeft: '2.5rem',
                        paddingRight: '1rem',
                        borderRadius: '0.375rem',
                        border: errors.phoneNumber ? '1px solid #EF4444' : '1px solid #D1D5DB',
                        height: '3rem',
                      }}
                    />
                    {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
                  </div>

                <div className="relative">
                  <textarea
                    placeholder="Go ahead, we are listening..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full h-32 p-3 border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:border-pink-500`}
                  ></textarea>
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-lg font-bold text-white transition bg-pink-600 rounded-md hover:bg-pink-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className='py-12 mx-6 mt-4 mb-4 text-white border rounded-md shadow-md '>
                <div className='container flex flex-wrap justify-center gap-24 mx-auto'>
                    <div className='max-w-xs p-6 text-center rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-purple-500 hover:to-blue-500'>
                        <h3 className='mb-4 text-xl font-bold'>Contact Us</h3>
                        <ul className='space-y-4'>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-envelope"></i>Email@gmail.com</li>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-phone"></i>+91 8287212406</li>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-location-dot"></i>B-8, Sector-2, Noida, UP (201301)</li>
                        </ul>
                    </div>
                    <div className='max-w-xs p-6 text-center rounded-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-purple-500 hover:to-blue-500'>
                        <h3 className='mb-4 text-xl font-bold'>Address 1</h3>
                        <ul className='space-y-4'>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-envelope"></i>Email@gmail.com</li>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-phone"></i>+91 8287212406</li>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-location-dot"></i>B-8, Sector-2, Noida, UP (201301)</li>
                        </ul>
                    </div>
                    <div className='hidden max-w-xs p-6 text-center rounded-lg sm:block bg-gradient-to-r from-pink-500 to-red-500 hover:from-purple-500 hover:to-blue-500'>
                        <h3 className='mb-4 text-xl font-bold'>Address 2</h3>
                        <ul className='space-y-4'>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-envelope"></i>Email@gmail.com</li>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-phone"></i>+91 8287212406</li>
                            <li className='flex items-center'><i className="mr-2 fa-solid fa-location-dot"></i>B-8, Sector-2, Noida, UP (201301)</li>
                        </ul>
                    </div>
                </div>
            </section>
            <div className="px-6 lg:w-1/2 lg:pr-4 md:hidden lg:hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4279112148374!2d77.31275360888095!3d28.586936975588202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f6005bd213%3A0x4dc8da46969d90b9!2sBlock-A%2C%20A62%2C%20A%20Block%2C%20Sector%202%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1726896367096!5m2!1sen!2sin" width="100%" height="300"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>

      {/* Render the company slider */}
      <CompanySlider />
    </>
  );
};

export default Contact;
