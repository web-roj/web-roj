import { useState } from 'react';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaVuejs, FaAngular, FaNodeJs, FaDocker, FaAws, FaJava, FaDatabase, FaMobileAlt, FaLaptopCode, FaTools, FaBrain, FaProjectDiagram, FaRobot, FaChartLine, FaFlask, FaSwift } from 'react-icons/fa';
import { SiDjango, SiFlutter, SiIonic, SiKeras, SiKotlin, SiMongodb, SiOracle, SiPostgresql, SiRedis, SiSqlite, SiTensorflow, SiXamarin } from "react-icons/si";

const TechStack = () => {
    const [activeStack, setActiveStack] = useState(0);

    const stacks = [
        { id: 1, name: 'ML & AI', technologies: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'Pandas', 'NumPy'] },
        { id: 2, name: 'Front-End', technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular'] },
        { id: 3, name: 'Back-End', technologies: ['Node.js', 'Express', 'Django', 'Flask', 'Ruby', 'Spring'] },
        { id: 4, name: 'Database', technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQLite'] },
        { id: 5, name: 'Android & Ios', technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin', 'Ionic'] },
    ];
    
      
    const icons = {
        'HTML': <FaHtml5 size={36} />,
        'CSS': <FaCss3Alt size={36} />,
        'JavaScript': <FaJsSquare size={36} />,
        'React': <FaReact size={36} />,
        'Vue': <FaVuejs size={36} />,
        'Angular': <FaAngular size={36} />,
        'Node.js': <FaNodeJs size={36} />,
        'Express': <FaNodeJs size={36} />,
        'Django': <SiDjango size={36} />,
        'Flask': <FaFlask size={36} />,
        'Ruby': <FaLaptopCode size={36} />,
        'Spring': <FaJava size={36} />,
        'MySQL': <FaDatabase size={36} />,
        'PostgreSQL': <SiPostgresql size={36} />,
        'MongoDB': <SiMongodb size={36} />,
        'Redis': <SiRedis size={36} />,
        'Oracle': <SiOracle size={36} />,
        'SQLite': <SiSqlite size={36} />,
        'Docker': <FaDocker size={36} />,
        'Kubernetes': <FaTools size={36} />,
        'Jenkins': <FaTools size={36} />,
        'Terraform': <FaTools size={36} />,
        'AWS': <FaAws size={36} />,
        'Azure': <FaAws size={36} />,
        'React Native': <FaMobileAlt size={36} />,
        'Flutter': <SiFlutter size={36} />,
        'Swift': <FaSwift size={36} />,
        'Kotlin': <SiKotlin size={36} />,
        'Xamarin': <SiXamarin size={36} />,
        'Ionic': <SiIonic size={36} />,
        'TensorFlow': <SiTensorflow size={36} />,
        'PyTorch': <FaBrain size={36} />,
        'Scikit-learn': <FaProjectDiagram size={36} />,
        'Keras': <SiKeras size={36} />,
        'Pandas': <FaChartLine size={36} />,
        'NumPy': <FaRobot size={36} />,
    };

    const handleButtonClick = (id) => {
        setActiveStack(id === activeStack ? 0 : id);
    };
    const handleRemoveStack = (id) => {
        // Remove the stack from the list of stacks
        setRemovedStacks([...removedStacks, id]);
        // Reset active stack if the removed one was active
        if (activeStack === id) setActiveStack(0);
    };

    const allTechnologies = stacks.reduce((acc, stack) => acc.concat(stack.technologies), []);

    return (
        <div className="px-6 mt-10 text-center">
         <div className="text-center ">
                <h1 className="mb-8 text-2xl font-bold text-gray-800 md:text-4xl">Technology <span className='text-[#fc005f]'>Stack</span></h1>
                <p className="mx-auto mb-8 text-sm leading-6 text-justify text-gray-700 lg:px-10 md:text-base">
                Our tech stack includes React.js for dynamic, responsive front-end development, and Node.js for efficient, scalable server-side applications. We utilize PostgreSQL for robust, reliable database management and AWS for flexible, secure cloud infrastructure.
                </p>
            </div>
            <div className="relative w-full overflow-x-scroll lg:hidden md:hidden whitespace-nowrap">
  <div className="flex py-2 space-x-4">
    <button
      onClick={() => handleButtonClick(0)}
      className={`relative flex items-center font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg transform transition-transform ${activeStack === 0 ? 'bg-gradient-to-r from-pink-500 to-red-500' : ''}`}
    >
      All
    </button>
    {stacks.map((stack) => (
      <div key={stack.id} className="relative inline-flex items-center">
        <button
          onClick={() => handleButtonClick(stack.id)}
          className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-6 py-2 rounded-lg  transform transition-transform ${activeStack === stack.id ? 'bg-gradient-to-r from-pink-500 to-red-500' : ''}`}
        >
          {stack.name}
        </button>
        {/* Cross button to remove the stack */}
        {/* <button
          onClick={() => handleRemoveStack(stack.id)}
          className="absolute top-0 right-0 w-4 h-4 text-white transform translate-x-2 -translate-y-2 bg-red-500 rounded-full"
        >
          &times;
        </button> */}
      </div>
    ))}
  </div>
</div>

        <div className="flex flex-wrap justify-center hidden mb-8 sm:block">
            <button 
                onClick={() => handleButtonClick(0)} 
                className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 m-2 rounded-lg transform transition-transform ${activeStack === 0 ? 'bg-gradient-to-r from-pink-500 to-red-500' : ''}`}
            >
                All
            </button>
            {stacks.map((stack) => (
                <button 
                    key={stack.id} 
                    onClick={() => handleButtonClick(stack.id)} 
                    className={`bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 m-2 rounded-lg transform transition-transform ${activeStack === stack.id ? 'bg-gradient-to-r from-pink-500 to-red-500' : ''}`}
                >
                    {stack.name}
                </button>
            ))}
        </div>
        
        <div className="grid grid-cols-2 md:gap-2 md:grid-cols-5 lg:grid-cols-6">
  {activeStack === 0 &&
    allTechnologies.map((tech, index) => (
      <div
        key={index}
        className="flex flex-col items-center justify-center h-24 p-2 m-2 transition-transform transform rounded-lg shadow-lg w-[153px] bg-gradient-to-r from-pink-500 to-red-500 hover:-translate-y-1 md:w-48 md:h-28 md:p-4"
      >
        {/* Assuming icons[tech] is an icon component */}
        <div className="text-2xl text-white">{icons[tech]}</div>
        <span className="mt-2 text-sm font-bold text-white md:text-lg">{tech}</span>
      </div>
    ))
  }
  {stacks.map((stack) =>
    activeStack === stack.id &&
    stack.technologies.map((tech, index) => (
      <div
      key={index}
      className="flex flex-col items-center justify-center h-24 p-2 m-2 transition-transform transform rounded-lg shadow-lg w-[153px] bg-gradient-to-r from-pink-500 to-red-500 hover:-translate-y-1 md:w-48 md:h-28 md:p-4"
    >
      {/* Assuming icons[tech] is an icon component */}
      <div className="text-2xl text-white">{icons[tech]}</div>
      <span className="mt-2 text-sm font-bold text-white md:text-lg">{tech}</span>
    </div>
    ))
  )}
</div>

    </div>
    
    
    
    );
};

export default TechStack;
