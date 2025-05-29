import { web1, web2, web3, web4, web5, web6 } from "../../../assets";
import CreateWebsiteModal from "../../ui/CreateWebsiteModal";
import { useState, useEffect } from "react";
import BrowserWidth from "../../../screens/Error/BrowserWidth";
import { motion } from "framer-motion";

const Templates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrowserTooSmall, setIsBrowserTooSmall] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const MIN_BROWSER_WIDTH = 1200; // Minimum width requirement in pixels

  const images = [web1, web2, web3, web4, web5, web6];

  // Handle window resize and check browser width
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);
      setIsBrowserTooSmall(currentWidth < MIN_BROWSER_WIDTH);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = () => {
    // Only open modal if browser is wide enough
    if (windowWidth >= MIN_BROWSER_WIDTH) {
      setIsModalOpen(!isModalOpen);
    } else {
      setIsBrowserTooSmall(true);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-8 px-4">
        <motion.div 
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-2xl md:text-3xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Lots of templates at your finger tip
          </motion.h1>
          
          <motion.p 
            className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create a stunning website for your business with ease, build with amazing <br className="hidden md:block" />
            templates
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleToggle}
              className='bg-orange-gradient-radial px-5 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow'
            >
              Create Website
            </button>
          </motion.div>
        </motion.div>
        
        {/* Template gallery */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {images.map((image, index) => (
            <motion.div 
              key={index}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={handleToggle}
            >
              <img 
                src={image} 
                alt={`Website template ${index + 1}`} 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Show the appropriate modal based on conditions */}
      {isModalOpen && windowWidth >= MIN_BROWSER_WIDTH && (
        <CreateWebsiteModal handleToggle={handleToggle} />
      )}
      
      {isBrowserTooSmall && (
        <BrowserWidth onClose={() => setIsBrowserTooSmall(false)} />
      )}
    </>
  );
};

export default Templates;
