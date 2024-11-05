import { FaHouseUser, FaCircleInfo, FaBriefcase, FaCogs, FaCheckCircle, FaBrain, FaRobot, FaMicrochip, FaMobileAlt, FaApple, FaAndroid, FaLaptopCode, FaPaintBrush, FaServer, FaCode, FaBuilding, FaBullhorn, FaSearch, FaPen, FaCloud, FaPalette, FaFilm, FaCube, FaGraduationCap, FaChalkboardTeacher, FaPuzzlePiece, FaChartPie, FaProjectDiagram, FaCalendarAlt, FaDatabase, FaFileContract, FaHeartbeat, FaUniversity, FaBook, FaShoppingCart, FaTruck, FaBlog, FaBriefcase as FaPortfolio, FaGlobe, FaEnvelope, FaUserGroup, FaBookOpen } from 'react-icons/fa';

export const Menudata = [
  {
    title: "Home",
    path: "/",
    cName: "nav-links",
    icon: <FaHouseUser />,
  },
  {
    title: "Company",
    path: "/",
    cName: "nav-links",
    icon: <FaCircleInfo />,
    submenu: [
      { title: 'About Us', path: '/about', icon: <FaBriefcase /> },
      { title: 'Career', path: '/about/how-we-work', icon: <FaCogs /> },
      { title: 'Our Team', path: '/about/quality-assurance', icon: <FaCheckCircle /> },
    ],
    chevron: <FaCircleInfo />, // Use an icon component for chevron if needed
  },
  {
    title: "Services",
    path: "/",
    cName: "nav-links",
    icon: <FaBriefcase />,
    submenu: [
      {
        title: 'ML & AI',
        path: '/services/aiandml',
        icon: <FaBrain />,
        submenu: [
          { title: 'Machine Learning', path: '/services/ml-ai/machine-learning', icon: <FaRobot /> },
          { title: 'Artificial Intelligence', path: '/services/ml-ai/artificial-intelligence', icon: <FaMicrochip /> }
        ],
        chevron: <FaCircleInfo />,
      },
      {
        title: 'Android & Ios App',
        path: '/services/mobileapp',
        icon: <FaMobileAlt />,
        submenu: [
          { title: 'iOS Development', path: '/services/mobile-app-development/ios', icon: <FaApple /> },
          { title: 'Android Development', path: '/services/mobile-app-development/android', icon: <FaAndroid /> }
        ],
        chevron: <FaCircleInfo />,
      },
      {
        title: 'Web Development',
        path: '/services/web',
        icon: <FaLaptopCode />,
        submenu: [
          { title: 'Frontend Development', path: '/services/web-development/frontend', icon: <FaPaintBrush /> },
          { title: 'Backend Development', path: '/services/web-development/backend', icon: <FaServer /> }
        ],
        chevron: <FaCircleInfo />,
      },
      // Add more submenus similarly
    ],
    chevron: <FaCircleInfo />,
  },
  {
    title: "Solutions",
    path: "/",
    cName: "nav-links",
    icon: <FaPuzzlePiece />,
    submenu: [
      { title: 'SAP', path: '/solutions/sap', icon: <FaChartPie /> },
      { title: 'ERPNext', path: '/solutions/erp', icon: <FaProjectDiagram /> },
      { title: 'Workday', path: '/solutions/workday', icon: <FaCalendarAlt /> },
      { title: 'Salesforce', path: '/solutions/salesforce', icon: <FaCloud /> },
      { title: 'Data Solutions', path: '/solutions/datasolutions', icon: <FaDatabase /> },
      { title: 'Contract Consulting', path: '/solutions/contract', icon: <FaFileContract /> },
    ],
    chevron: <FaCircleInfo />,
  },
  {
    title: "Industries",
    path: "/",
    cName: "nav-links",
    icon: <FaProjectDiagram />,
    submenu: [
      { title: 'Health Care', path: '/industries/health-care', icon: <FaHeartbeat /> },
      { title: 'Banking & Finance', path: '/industries/banking-finance', icon: <FaUniversity /> },
      { title: 'Education & E-learning', path: '/industries/education-elearning', icon: <FaBook /> },
    ],
    chevron: <FaCircleInfo />,
  },
  {
    title: "Resources",
    path: "/",
   
    icon: <FaBookOpen/>,
    submenu: [
      { title: 'Blog', path: '/resources/blog', icon: 'fa-solid fa-blog' },
      { title: 'Portfolio', path: '/resources/portfolio', icon: 'fa-solid fa-briefcase' },
      { title: 'Web Stories', path: '/resources/web-stories', icon: 'fa-solid fa-globe' },
    ],
    chevron: "fa-solid fa-chevron-down"
  },
  {
    title: "Contact",
    path: "/contact",
    cName: "nav-links btn-style", // Button styling for Contact
    icon: <FaEnvelope />,
  },
  {
    title: "Hiring",
    path: "/hiring",
    cName: "nav-links btn-style btn-mobile", // Button styling for Hiring (Mobile view)
    icon: <FaUserGroup />,
  },
];
