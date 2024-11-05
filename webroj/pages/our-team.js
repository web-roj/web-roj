import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaMailBulk } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '@/Firebase/config';
import Head from 'next/head';

const TeamPage = () => {

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const teamRef = collection(db, 'ourteam');
      const teamsSnapshot = await getDocs(teamRef);
      const teamList = teamsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamMembers(teamList);
    } catch (error) {
      console.error('Error fetching team: ', error);
      // Handle error (e.g., show a toast notification)
    }
  };
    return (
 <>
 <Head>
      <title>Our Team - Webroj Software Company</title>
      <meta name="description" content="Meet the talented and dedicated team behind Webroj Software Company. We are committed to delivering innovative software solutions and exceptional service." />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
        <div>
            {/* Banner Section */}
            <div className="flex flex-col items-center justify-center w-full lg:h-[200px] md:h-[200px] lg:text-4xl md:text-4xl text-xl font-bold h-36 text-white bg-gradient-to-r from-purple-600 to-blue-500">
  <Link href='/'>
  <motion.h1
     initial={{ opacity: 0, y: -100 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5, delay: 0 }}  
     className='mb-2 text-base sm:text-2xl lg:text-2xl'
  >
    Home/Our Team
  </motion.h1>
  </Link>
  <motion.h1
     initial={{ opacity: 0, y: -50 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.8, delay: 0.6 }}  
     className='text-2xl sm:text-3xl lg:text-4xl'
  >
    Meet Our Experts
  </motion.h1>
</div>


            {/* Team Member Section */}
            <div className="container px-6 py-16 mx-auto">
      <div className="flex items-center justify-center w-full">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={member.id} // Use unique ID from Firestore
              className="flex flex-col items-center p-6 text-center text-white rounded-lg team-member bg-gradient-to-r from-pink-500 to-orange-500"
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img 
                src={member.imageUrl} // Use image URL from Firestore
                alt={member.name} // Use member's name for alt text
                className="object-cover w-24 h-24 mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className='font-semibold'>{member.role}</p>
              <p className="mt-2 text-sm font-semibold">{member.description}</p> {/* Display member description */}
            </motion.div>
          ))}
        </div>
      </div>
    </div>

            {/* Attractive Section */}
            <div className="relative py-16 mb-8 text-white bg-gradient-to-r from-blue-600 to-purple-500">
                <div className="container mx-auto text-center">
                    <motion.h2 
                        className="mb-4 text-3xl font-bold"
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 1 }}
                    >
                        Join Us and Be Part of the Future
                    </motion.h2>
                    <p className="max-w-2xl mx-auto text-lg">
                        We believe in innovation, creativity, and collaboration. Our team is constantly growing and evolving, and we want you to be part of it.
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

export default TeamPage;
