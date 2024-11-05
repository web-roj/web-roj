import React, { useState, useEffect, useRef } from 'react';
import logo from '../Images/logo.png';
import Image from 'next/image';
import { 
    FaAndroid, FaApple, FaBars, FaBlog, FaBook, 
    FaBookOpen, FaBrain, FaBriefcase, FaBuilding, 
    FaBullhorn, FaCalendarAlt, FaChartPie, FaCheckCircle, 
    FaCloud, FaCode, FaCogs, FaDatabase, FaEnvelope, 
    FaFileContract, FaFilm, FaGlobe, FaGraduationCap, 
    FaHeart, FaHeartbeat, FaHome, FaInfoCircle, 
    FaMicrochip, FaMicrosoft, FaMobile, FaPaintBrush, 
    FaPallet, FaProjectDiagram, FaPuzzlePiece, FaRobot, 
    FaServer, FaShoppingCart, FaSpeakerDeck, FaTimes, 
    FaTruck, FaUniversity, FaUsers 
} from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/Firebase/config'; 

const Header = () => {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const navRef = useRef(null);
    const [logos, setLogos] = useState([]);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const toggleDropdown = (index) => {
        setDropdown(dropdown === index ? null : index);
    };

    const handleMouseEnter = (index) => {
        if (!isMobile) {
            setDropdown(index);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setDropdown(null);
        }
    };

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setDropdown(null);
            closeMobileMenu();
        }
    };

    useEffect(() => {
        // Detect window size only on the client side
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setIsMobile(window.innerWidth < 768);
            };
            // Run on initial load
            handleResize();
            // Add event listener for window resize
            window.addEventListener('resize', handleResize);
            // Cleanup on unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);
    useEffect(() => {
        const fetchLogos = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'logos'));
            const logosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setLogos(logosData);
          } catch (err) {
            console.error("Error fetching logos:", err);
          }
         
        };
    
        fetchLogos();
      }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
   
    const Menudata = [
        {
            title: 'Home',
            path: '/',
            icon: <FaHome />,
        },
        {
            title: 'Our Company',
            icon: <FaInfoCircle />,
            submenu: [
                { title: 'About Us', path: '/about-us', icon: <FaBriefcase /> },
                { title: 'Career', path: '/career', icon: <FaCogs /> },
                { title: 'Our Team', path: '/our-team', icon: <FaCheckCircle /> },
            ],
        },
        {
            title: 'Services',
            icon: <FaBriefcase />,
            submenu: [
                { title: 'AI & ML', path: '/ai-ml/', icon: <FaBrain /> },
                { title: 'Android & Ios', path: '/android-ios', icon: <FaMobile /> },
                { title: 'Web Development', path: '/web-development', icon: <FaCode /> },
                { title: 'Custom Software', path: '/custom-software', icon: <FaMicrosoft /> },
                { title: 'Digital Marketing', path: '/digital-marketing', icon: <FaBullhorn /> },
                { title: 'Cloud Solutions', path: '/cloud-solutions', icon: <FaCloud /> },
                { title: 'Graphics & Animations', path: '/graphics-animations', icon: <FaPaintBrush /> },
                { title: 'Training & Internship', path: '/training-internship', icon: <FaGraduationCap /> }
            ]
        },
        {
            title: "Solutions",
            icon: <FaPuzzlePiece />,
            submenu: [
                { title: 'SAP', path: '/sap', icon: <FaChartPie /> },
                { title: 'ERPNext', path: '/erp-next', icon: <FaProjectDiagram /> },
                { title: 'Workday', path: '/workday', icon: <FaCalendarAlt /> },
                { title: 'Salesforce', path: '/salesforce', icon: <FaCloud /> },
                { title: 'Data Solutions', path: '/data-solutions', icon: <FaDatabase /> },
                { title: 'Contract Consulting', path: '/contract-consulting', icon: <FaFileContract /> },
                { title: 'Amazon Web Services', path: '/amazon-web-services', icon: <FaCloud /> },
            ],
        },
        {
            title: "Industries",
            icon: <FaProjectDiagram />,
            submenu: [
                { title: 'Health Care', path: '/health-care', icon: <FaHeart /> },
                { title: 'Real Estate', path: '/real-estate', icon: <FaBuilding />},
                { title: 'Banking & Finance', path: '/banking-finance', icon: <FaUniversity /> },
                { title: 'Education & E-learning', path: '/education-elearning', icon: <FaBook /> },
                { title: 'Ecommerce Solution', path: '/ecommerce-solutions', icon: <FaShoppingCart /> },
                { title: 'Media & Entertainment', path: '/media-entertainment', icon: <FaFilm /> },
                { title: 'Logistics & Transportation', path: '/logistics-transportation', icon: <FaTruck /> },
            ],
        },
        {
            title: "Resources",
            icon: <FaBookOpen />,
            submenu: [
                { title: 'Blog', path: '/blog', icon: <FaBlog />},
                { title: 'Portfolio', path: '/portfolio', icon: <FaBriefcase /> },
                { title: 'Web Stories', path:'/web-stories', icon: <FaGlobe />},
            ],
        },
        {
            title: 'Contact',
            path: '/contact-us',
            cName: "nav-links btn-style",
            icon: <FaEnvelope />,
        },
        {
            title: "Hiring",
            path: "/hiring",
            cName: "nav-links btn-style btn-mobile",
            icon: <FaUsers />,
        },
    ];


    return (
        <nav className='fixed relative top-0 left-0 z-10 flex items-center justify-between w-full h-16 px-4 text-xl bg-white shadow-md md:px-8 md:h-20' ref={navRef}>
        
        {logos.length > 0 && (
                <Image 
                    src={logos[0].url} // Display the first uploaded logo
                    alt={logos[0].name} // Alternative text for the logo
                    className='h-10 cursor-pointer md:w-28 lg:w-40 w-28 md:h-12'
                    width={160} // Adjust width as necessary
                    height={40} // Adjust height as necessary
                />
            )}

            <div className='md:hidden' onClick={handleClick}>
                {click ? <FaTimes className='text-2xl' /> : <FaBars className='text-2xl' />}
            </div>
            <ul className={`absolute md:relative bg-white md:bg-transparent shadow-md md:shadow-none rounded p-4 md:p-0 list-none ${click ? 'block' : 'hidden'} md:flex md:items-center md:justify-end w-full md:w-auto md:h-auto top-16 md:top-auto left-0 md:left-auto transition-all duration-300`}>
                {Menudata.map((item, index) => (
                    <li 
                        key={index}
                        className='relative px-4 py-2 text-base font-semibold text-gray-600 capitalize transition-all duration-200 border-b-[1px] border-pink-200 lg:rounded md:rounded lg:border-b-0 md:border-b-0 whitespace-nowrap hover:text-pink-600 hover:underline'
                        onMouseEnter={() => handleMouseEnter(index)}
                        // onMouseLeave={handleMouseLeave}
                    >
                        <a href={item.path} className='flex items-center cursor-pointer' onClick={() => {
                            if (isMobile && item.submenu && item.submenu.length > 0) {
                                toggleDropdown(index);
                            } else {
                                closeMobileMenu();
                            }
                        }}>
                            {item.icon}
                            <span className='ml-2'>{item.title}</span>
                        </a>
                        {item.submenu && item.submenu.length > 0 && (
                            <ul className={`absolute bg-white shadow-md rounded p-4 list-none z-10 ${dropdown === index ? 'block' : 'hidden'} ${isMobile ? 'relative mt-2' : 'absolute left-0 top-full mt-1'}`}>
                                {item.submenu.map((subItem, subIndex) => (
                                    <li key={subIndex} className='flex items-center px-4 py-2 text-sm font-bold text-gray-600 transition-all duration-200 rounded hover:bg-gray-100 hover:text-pink-600'>
                                        <a href={subItem.path} className='flex items-center' onClick={closeMobileMenu}>
                                            {subItem.icon}
                                            <span className='ml-2'>{subItem.title}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Header;
