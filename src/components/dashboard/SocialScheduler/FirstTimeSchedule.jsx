import { useEffect, useRef, useState } from "react";
import { connect, create, socials } from "../../../assets";
import { Icon } from "@iconify/react/dist/iconify.js";
import SocialSelectionModal from "./SocialSelectionModal";
import gsap from "gsap";

const FirstTimeSchedule = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Create refs for animation targets
  const headerRef = useRef(null);
  const imageRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: 0.5,
        clearProps: "all",
      },
    });

    // Simple fade-in
    tl.from(headerRef.current, {
      y: 15,
      opacity: 0,
    });

    tl.from(
      imageRef.current,
      {
        opacity: 0,
      },
      "-=0.2"
    );

    tl.from(
      [card1Ref.current, card2Ref.current],
      {
        y: 20,
        opacity: 0,
        stagger: 0.1,
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Modal for social connection */}
      {isModalOpen && <SocialSelectionModal toggleModal={toggleModal} />}
      <div className='p-4 overflow-hidden'>
        {/* Header section */}
        <div className='flex flex-col md:flex-row justify-around items-center border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm'>
          <div
            className='flex flex-col gap-5 w-full md:w-1/2 mb-6 md:mb-0'
            ref={headerRef}
          >
            <div>
              <span className='font-bold text-xl md:text-2xl'>
                Connect your Socials and create automated posts
              </span>
            </div>
            <div>
              <p className='text-gray-500 text-sm md:text-base'>
                Create posts in all socials with one post. Saves time
              </p>
            </div>
            <div className='flex items-center'>
              <button className='px-6 py-2 md:px-8 md:py-3 bg-orange-gradient text-white rounded-xl'>
                Upgrade to connect more socials
              </button>
            </div>
          </div>

          <div
            className='w-full md:w-1/2 flex justify-center'
            ref={imageRef}
          >
            <img
              src={socials}
              alt='Social Media Platforms'
              className='max-w-full h-auto'
            />
          </div>
        </div>

        {/* Cards section */}
        <div className='flex flex-col md:flex-row justify-center mt-10 gap-4 md:gap-8'>
          {/* Card 1 */}
          <div
            ref={card1Ref}
            className='flex flex-col connect-card p-4 md:p-6 rounded-md shadow-sm w-full md:w-1/3 mb-4 md:mb-0 border border-gray-100'
          >
            <div className='flex justify-between items-center'>
              <div className='w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-white text-sm'>
                1
              </div>
              <p className='font-medium text-sm md:text-base'>
                Connect Your Socials
              </p>
              <div className='w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center'>
                <Icon
                  onClick={toggleModal}
                  className='text-white cursor-pointer'
                  icon={"hugeicons:connect"}
                ></Icon>
              </div>
            </div>
            <div className='mt-4 font-light text-gray-500 text-center text-sm md:text-base'>
              Get started by connecting your social accounts
            </div>
            <div className='flex justify-center h-32 md:h-40 mt-4'>
              <img
                className='object-contain max-h-full'
                src={connect}
                alt='Connect Socials'
              />
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={card2Ref}
            className='flex flex-col create-card p-4 md:p-6 rounded-md shadow-sm w-full md:w-1/3 mb-4 md:mb-0 border border-gray-100'
          >
            <div className='flex justify-between items-center'>
              <div className='w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-white text-sm'>
                2
              </div>
              <p className='font-medium text-sm md:text-base'>
                Create First Post
              </p>
              <div className='w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center'>
                <Icon className='text-white' icon={"bi:send-check"}></Icon>
              </div>
            </div>
            <div className='mt-4 font-light text-gray-500 text-center text-sm md:text-base'>
              Create and schedule your first post
            </div>
            <div className='flex justify-center h-32 md:h-40 mt-4'>
              <img
                className='object-contain max-h-full'
                src={create}
                alt='Create Post'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstTimeSchedule;
