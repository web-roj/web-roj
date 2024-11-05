import React, { useEffect, useRef, useState } from 'react';
import { FaEnvelope, FaLocationArrow, FaLongArrowAltRight, FaPhone, FaUser } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Image from 'next/image'; // Use Image component for optimized images in Next.js
import ContactImage from '../Images/contact.png';
import ContactImage2 from '../Images/hiring.png';
import Link from 'next/link';
import CompanySlider from '@/Components/CompanySlider';
import FloatingLabelInput from '@/Components/FloatingLabelInput';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db, storage } from '@/Firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Head from 'next/head';


const hiring = () => {
  
  const [banners, setBanners] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [role, setRole] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);

  const validateForm = () => {
    // Check if any field is empty
    if (!firstName || !lastName || !phoneNumber || !email || !experience || !role || !coverLetter || !resume) {
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

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const sendDataToFirestore = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateForm()) return; // Validate form before submission

    try {
      // Upload resume to Firebase Storage
      const resumeRef = ref(storage, `resumes/${resume.name}`);
      await uploadBytes(resumeRef, resume); // Upload the file

      // Get the download URL for the uploaded resume
      const resumeURL = await getDownloadURL(resumeRef);

      // Add form data to Firestore
      await addDoc(collection(db, 'applications'), {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        email: email,
        experience: experience,
        role: role,
        cover_letter: coverLetter,
        resume_url: resumeURL, // Store the download URL of the uploaded resume
        timestamp: new Date(),
      });

      toast.success("Your application has been submitted!"); // Show success toast
      resetForm(); // Reset the form after storing
    } catch (error) {
      console.error('Error writing document: ', error);
      toast.error("There was an error submitting your application."); // Show error toast
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setExperience('');
    setRole('');
    setCoverLetter('');
    setResume(null);
    setIsOpen(false); // Close the modal
  };


  useEffect(() => {
      const fetchBanners = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'banners'));
          const bannersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          // Filter banners based on the "About Us" category
          const aboutUsBanners = bannersData.filter(banner => banner.category === "hiring");
          
          setBanners(aboutUsBanners);
        } catch (error) {
          console.error("Error fetching banners:", error);
        }
      };
  
      fetchBanners();
    }, []);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_id', 'templtae', form.current, {
            publicKey: 'key',
        }).then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };

   
    return (
        <>
         <Head>
      <title>Hiring - Join Our Team at Webroj Software Company</title>
      <meta name="description" content="Explore exciting career opportunities at Webroj. Join our team and contribute to innovative projects in the tech industry." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
            <section className="" id="contact">
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
          Home/Hiring
        </Link>
        <span className="block mt-2 text-2xl font-bold sm:text-3xl lg:text-4xl whitespace-nowrap">Hiring</span>
      </div>
    </div>
  ))}
</div>


                <div className="container grid gap-10 px-4 py-10 mx-auto lg:grid-cols-2">
                    <div className="hidden w-full sm:block">
                        <Image src={ContactImage2} alt="Contact" className="object-cover w-full h-auto" />
                    </div>
                    
                    <div className="w-full p-6 mt-8 border border-pink-300 rounded-md rounded-lg shadow-md shadow-xl hover:shadow-pink-600 ">
  <div className="max-w-md mx-auto">
    <h2 className="mb-6 text-xl font-bold text-center text-transparent bg-black lg:text-3xl md:text-3xl bg-clip-text">
      Submit Your <span className='text-[#fc005f]'>Application</span>
    </h2>
    <form className="space-y-4" onSubmit={sendDataToFirestore}>
      {/* First Name and Last Name */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="relative">
          <FloatingLabelInput
            type="text"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="pl-10"
          />
          <span className="absolute inset-y-0 flex items-center text-pink-400 left-3">
            <FaUser />
          </span>
        </div>
        <div className="relative">
          <FloatingLabelInput
            type="text"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="pl-10"
          />
          <span className="absolute inset-y-0 flex items-center text-pink-400 left-3">
            <FaUser />
          </span>
        </div>
      </div>

      {/* Phone Number and Email */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
       

        <div className="relative mt-2">
          <FloatingLabelInput
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
          />
          <span className="absolute inset-y-0 flex items-center text-pink-400 left-3">
            <FaEnvelope />
          </span>
        </div>
        <div className="relative mt-2">
          <span className="absolute inset-y-0 flex items-center text-pink-400 left-3">
            <FaPhone />
          </span>
          <PhoneInput
            country={'us'}
            inputStyle={{
              width: '100%',
              paddingLeft: '2.5rem',
              paddingRight: '1rem',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid #D1D5DB',
              height: '3rem',
            }}
            buttonClass="text-gray-400"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
      </div>

      {/* Experience and Role Inputs */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="relative mt-2">
          <FloatingLabelInput
            type="number"
            label="Experience (Years)"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="pl-10"
          />
          <span className="absolute inset-y-0 flex items-center text-pink-400 left-3">
            <FaUser />
          </span>
        </div>
        <div className="relative mt-2">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 pl-10 border border-pink-400 rounded-md appearance-none"
            required
          >
            <option value="" disabled>Select a role</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="analyst">Analyst</option>
            {/* Add more options as needed */}
          </select>
          <span className="absolute inset-y-0 flex items-center text-pink-400 left-3">
            <FaUser />
          </span>
        </div>
      </div>

      {/* Resume Upload */}
      <div className="relative">
        <label className="block text-gray-600">Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="w-full p-2 border border-pink-400 rounded-md"
          required // Make this field required
        />
      </div>

      {/* Cover Letter Textarea */}
      <div className="relative">
        <textarea
          placeholder="Cover Letter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-pink-500"
          required // Make this field required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 font-bold text-white rounded-md bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-500 hover:scale-105 hover:shadow-lg"
      >
        Submit
      </button>
    </form>
  </div>
</div>
<div className="w-full md:hidden lg:hidden">
                        <Image src={ContactImage2} alt="Contact" className="object-cover w-full h-auto" />
                    </div>
                </div>
            </section>

     
      
            <CompanySlider />
        </>
    );
}

export default hiring;
