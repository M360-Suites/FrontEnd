import { motion } from "framer-motion";
import { build } from "../../assets/index";
import { useState, useEffect } from "react";
import CreateWebsiteModal from "../../components/ui/CreateWebsiteModal";
import BrowserWidth from "../Error/BrowserWidth";
import ExistingWebsites from "../../components/dashboard/Website/ExistingWebsites";

const CreateWebsite = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBrowserTooSmall, setIsBrowserTooSmall] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const existingSites = true;

  const MIN_BROWSER_WIDTH = 1200;

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
      {existingSites ? (
        <ExistingWebsites />
      ) : (
        <div className='flex flex-col items-center justify-center mt-8 md:mt-16 px-4 md:px-6'>
          <motion.div
            className='space-y-4 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className='text-2xl md:text-3xl lg:text-4xl font-semibold block'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Stand out Online with a unique website
            </motion.span>
            <motion.p
              className='text-gray-500 text-base md:text-lg lg:text-xl max-w-2xl mx-auto'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Create a stunning website for your business with ease, build
              with amazing templates and customize it to your liking
            </motion.p>
          </motion.div>
          <motion.div
            className='mt-6 md:mt-8'
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
          <motion.div
            className='mt-8 md:mt-16 w-full max-w-4xl'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              type: "spring",
              damping: 15,
            }}
          >
            <motion.img
              src={build}
              alt='Website builder illustration'
              className='w-full h-auto'
              whileInView={{
                scale: [1, 1.02, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          </motion.div>
        </div>
      )}

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

export default CreateWebsite;
