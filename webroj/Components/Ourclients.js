import React, { useEffect, useState } from 'react';
import { db } from '@/Firebase/config'; // Adjust the import based on your file structure
import { collection, getDocs } from 'firebase/firestore';

const Ourclients = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const achievementsCollection = collection(db, 'achievements'); // Replace 'achievements' with your Firestore collection name
                const snapshot = await getDocs(achievementsCollection);
                const achievementsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAchievements(achievementsData);
            } catch (error) {
                console.error('Error fetching achievements: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <>
            <div className="px-6 mt-10 text-center">
                <h1 className="mb-8 text-2xl font-bold text-gray-800 md:text-4xl">
                    Our <span className="text-[#fc005f]">Achievements</span>
                </h1>
                <p className="mx-auto mb-8 text-sm leading-6 text-justify text-gray-700 lg:px-10 md:px-10 md:text-base">
                    At <b>Webroj</b>, we have a proven track record of delivering exceptional IT solutions that drive business growth and efficiency. Our achievements include successfully deploying over 100 custom software applications across various industries, achieving a 99.9% client satisfaction rate, and reducing operational costs for our clients by an average of 30%. We have also been recognized with multiple industry awards for innovation and excellence in technology services. Our dedicated team continues to push the boundaries of what's possible, ensuring our clients stay ahead in an ever-evolving digital landscape.
                </p>
            </div>

            <div className="px-4 pt-[2rem] pb-[1rem] bg-gradient-to-b from-[#EE5133] to-[#EF2B73]">
                <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 lg:grid-cols-4">
                    {loading ? (
                        <p className="text-white">Loading...</p>
                    ) : (
                        achievements.map((achievement, index) => (
                            <React.Fragment key={index}>
                                {/* Years of Experience */}
                                <div className="flex flex-col items-center mb-8">
                                    <div className="md:w-20 lg:w-20 md:h-20 lg:h-20 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff416c] to-[#ff4b2b] relative mb-4">
                                        <div className="absolute w-full h-full bg-white rounded-full top-1 left-1 right-1 bottom-1"></div>
                                        <h2 className="relative ml-2 text-xl font-bold text-gray-800 lg:text-3xl md:text-3xl">{achievement.yearsOfExperience}+</h2>
                                    </div>
                                    <p className="text-sm font-bold text-white lg:text-xl md:text-xl">Years Of Experience</p>
                                </div>

                                {/* Total Clients */}
                                <div className="flex flex-col items-center mb-8">
                                    <div className="md:w-20 lg:w-20 md:h-20 lg:h-20 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff416c] to-[#ff4b2b] relative mb-4">
                                        <div className="absolute w-full h-full bg-white rounded-full top-1 left-1 right-1 bottom-1"></div>
                                        <h2 className="relative ml-2 text-xl font-bold text-gray-800 lg:text-3xl md:text-3xl">{achievement.totalClients}+</h2>
                                    </div>
                                    <p className="text-sm font-bold text-white lg:text-xl md:text-xl">Total Clients</p>
                                </div>

                                {/* Completed Projects */}
                                <div className="flex flex-col items-center mb-8">
                                    <div className="md:w-20 lg:w-20 md:h-20 lg:h-20 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff416c] to-[#ff4b2b] relative mb-4">
                                        <div className="absolute w-full h-full bg-white rounded-full top-1 left-1 right-1 bottom-1"></div>
                                        <h2 className="relative ml-2 text-xl font-bold text-gray-800 lg:text-3xl md:text-3xl">{achievement.completedProjects}+</h2>
                                    </div>
                                    <p className="text-sm font-bold text-white lg:text-xl md:text-xl">Completed Projects</p>
                                </div>

                                {/* Happy Clients */}
                                <div className="flex flex-col items-center mb-8">
                                    <div className="md:w-20 lg:w-20 md:h-20 lg:h-20 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff416c] to-[#ff4b2b] relative mb-4">
                                        <div className="absolute w-full h-full bg-white rounded-full top-1 left-1 right-1 bottom-1"></div>
                                        <h2 className="relative ml-2 text-xl font-bold text-gray-800 lg:text-3xl md:text-3xl">{achievement.happyClients}+</h2>
                                    </div>
                                    <p className="text-sm font-bold text-white lg:text-xl md:text-xl">Happy Clients</p>
                                </div>
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Ourclients;
