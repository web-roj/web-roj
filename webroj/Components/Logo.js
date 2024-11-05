import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/config'; // Adjust the path according to your project structure
import Image from 'next/image'; // Importing Next.js Image component

const LogoGallery = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch logos from Firestore
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'logos'));
        const logosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLogos(logosData);
      } catch (err) {
        console.error("Error fetching logos:", err);
        setError("Failed to fetch logos");
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchLogos();
  }, []);

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>{error}</div>; // Display error state

  return (
    <div className="logo-gallery">
      {logos.map(logo => (
        <div key={logo.id} className="logo-item">
          <Image
            src={logo.url}
            alt={logo.name} // Using logo name as alt text for accessibility
            width={160} // Adjust based on your design
            height={40} // Adjust based on your design
            className="text-white cursor-pointer md:w-28 md:h-12 lg:w-40 w-28"
            layout="responsive" // Optional, depending on your layout needs
          />
          <p>{logo.name}</p> {/* Display logo name */}
        </div>
      ))}
    </div>
  );
};

export default LogoGallery;
