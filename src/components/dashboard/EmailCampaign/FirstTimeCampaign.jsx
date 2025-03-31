import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import gsap from "gsap";
import {
  mailSent,
  setUpMail,
  importContact,
  createCampaign,
} from "../../../assets";
import CreateCampaignModal from "./CreateCampaignModal";

const FirstTimeCampaign = () => {
  const cardsRef = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  // GSAP animation for cards
  useEffect(() => {
    if (cardsRef.current.length) {
      gsap.fromTo(
        cardsRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, []);

  // Add card to refs
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <>
      {showModal && (
        <CreateCampaignModal handleToggleModal={handleToggleModal} />
      )}

      <div className='p-4'>
        {/* First Section */}
        <div className='flex flex-col md:flex-row justify-around items-center border border-gray-200 rounded-lg p-4'>
          <div className='flex flex-col gap-5 w-full md:w-1/2 mb-4 md:mb-0'>
            <div>
              <span className='font-bold text-xl'>
                Track Your Email Campaigns
              </span>
            </div>
            <div>
              <p className='text-gray-600 text-sm'>
                Upgrade your account to enjoy seamless email automation
              </p>
            </div>
            <div className='flex items-center'>
              <button className='px-8 py-2 bg-orange-gradient text-white rounded-xl'>
                Upgrade
              </button>
            </div>
          </div>

          <div className='w-full md:w-1/2 flex justify-center'>
            <img
              src={mailSent}
              alt='mailSent'
              className='max-w-full h-auto'
            />
          </div>
        </div>

        {/* Second Section */}
        <div className='flex flex-col md:flex-row justify-between gap-4 mt-10 p-4'>
          {/* Card 1 */}
          <div
            ref={addToRefs}
            className='flex flex-col gap-5 email-card p-4 rounded-md shadow-sm w-full md:w-1/3 mb-4 md:mb-0'
          >
            <div className='flex justify-between items-center'>
              <div className='w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-sm'>
                1
              </div>
              <p className='font-medium'>SetUp your email</p>
              <div className='w-6 h-6 bg-green-400 rounded-full flex items-center justify-center'>
                <Icon
                  className='text-white'
                  icon={"line-md:check-all"}
                ></Icon>
              </div>
            </div>
            <div className='mt-4 font-light text-gray-500 text-center'>
              Create your first campaign and reach global audience
            </div>
            <div className='flex justify-center h-40'>
              <img
                className='object-contain max-h-full'
                src={setUpMail}
                alt='Setup Email'
              />
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={addToRefs}
            className='flex flex-col gap-5 contact-card p-4 rounded-md shadow-sm w-full md:w-1/3 mb-4 md:mb-0'
          >
            <div className='flex justify-between items-center'>
              <div className='cursor-pointer w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center text-white text-sm'>
                2
              </div>
              <p className='font-medium'>Add/Import Contact</p>
              <div className='cursor-pointer w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center'>
                <Icon
                  className='text-white'
                  icon={"weui:arrow-outlined"}
                ></Icon>
              </div>
            </div>
            <div className='mt-4 font-light text-gray-500 text-center'>
              Import emails of your target audience
            </div>
            <div className='flex justify-center h-40'>
              <img
                className='object-contain max-h-full'
                src={importContact}
                alt='Import Contact'
              />
            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={addToRefs}
            className='flex flex-col gap-5 camp-card p-4 rounded-md shadow-sm w-full md:w-1/3'
          >
            <div className='flex justify-between items-center'>
              <div className='cursor-pointer w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm'>
                3
              </div>
              <p className='font-medium'>Create First Campaign</p>
              <div
                onClick={handleToggleModal}
                className='cursor-pointer w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center'
              >
                <Icon
                  className='text-white'
                  icon={"weui:arrow-outlined"}
                ></Icon>
              </div>
            </div>
            <div className='mt-4 font-light text-gray-500 text-center'>
              Create your first campaign and reach global audience
            </div>
            <div className='flex justify-center h-40'>
              <img
                className='object-contain max-h-full'
                src={createCampaign}
                alt='Create Campaign'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstTimeCampaign;
