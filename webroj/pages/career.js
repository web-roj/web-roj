import { db } from '@/Firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CareerPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
          const jobRef = collection(db, 'jobs'); // Adjust collection name as needed
          const jobSnapshot = await getDocs(jobRef);
          const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setJobs(jobList); // Set jobs state with fetched data
        } catch (error) {
          console.error('Error fetching jobs: ', error);
          // Optionally handle error state here
        }
      };
    
      // Fetch job data on component mount
      useEffect(() => {
        fetchJobs();
      }, []);
    

    return (
      <>
       <Head>
      <title>Careers - Webroj Software Company</title>
      <meta name="description" content="Join Webroj Software Company and be part of an innovative team dedicated to delivering cutting-edge software solutions. Explore our job openings and start your career with us." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
        <div >
          
          {/* Banner Section */}
          <div className="flex flex-col items-center justify-center w-full lg:h-[200px] md:h-[200px] lg:text-4xl md:text-4xl text-xl font-bold h-36 text-white bg-gradient-to-r from-green-300 to-green-600">
<Link href='/'>
<motion.h1
   initial={{ opacity: 0, y: -100 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5, delay: 0 }}  
   className='mb-2 text-base sm:text-2xl lg:text-2xl'
>
  Home/Career
</motion.h1>
</Link>
<motion.h1
   initial={{ opacity: 0, y: -50 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.8, delay: 0.6 }}  
   className='text-2xl sm:text-3xl lg:text-4xl'
>
  Join Our Team
</motion.h1>
</div>
<div className="container px-6 py-16 mx-auto">
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-8 text-3xl font-bold">Current Job <span className='text-[#fc005f]'>Openings</span></h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length > 0 ? (
          jobs.map((job, i) => (
            <motion.div
              key={job.id}
              className="p-6 text-white rounded-lg job-card bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="mt-1">Location: {job.location}</p>
              <p className="mt-2 text-lg break-words">{job.description}</p>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 mt-4 font-bold text-white rounded bg-gradient-to-r from-pink-500 to-red-500 hover:bg-gradient-to-l hover:from-pink-500 hover:to-purple-500"
              >
               <a href='/hiring'> Apply Now</a>
              </button>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No job openings available.</p>
        )}
      </div>
    </motion.div>
  </div>

          {/* Application Form Section */}
     

          {/* Attractive Section */}
          <div className="relative py-16 mt-16 text-white bg-gradient-to-r from-yellow-500 to-red-500">
              <div className="container mx-auto text-center">
                  <motion.h2
                      className="mb-4 text-3xl font-bold"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                  >
                      Why Work With Us?
                  </motion.h2>
                  <p className="max-w-2xl mx-auto text-lg">
                      We are an innovative team that values creativity, growth, and teamwork. Join us for an exciting career!
                  </p>
              </div>

              {/* Framer Motion Dots */}
              <motion.div
                  className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden"
                  initial="hidden"
                  animate="visible"
                  variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
                  }}
              >
                  {[...Array(20)].map((_, i) => (
                      <motion.div
                          key={i}
                          className="absolute w-4 h-4 bg-white rounded-full"
                          style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                          }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1, yoyo: Infinity, delay: Math.random() }}
                      />
                  ))}
              </motion.div>
          </div>
      </div>
      </>
    );
};

export default CareerPage;
