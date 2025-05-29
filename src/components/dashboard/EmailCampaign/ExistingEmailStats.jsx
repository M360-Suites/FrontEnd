import { mailSent } from "../../../assets";
import { sampleStats } from "../../../utils/dummyData";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreateCampaignModal from "./CreateCampaignModal";
import { useState } from "react";
import CampaignReports from "./CampaignReports";
import EmailPerfomanceChart from "./EmailPerfomanceChart";

const ExistingEmailStats = () => {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState(sampleStats);

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <CreateCampaignModal handleToggleModal={handleToggleModal} />
      )}
      <div className='p-4'>
        <div className='flex flex-col md:flex-row justify-around items-center border border-gray-200 rounded-lg p-4'>
          <div className='flex flex-col gap-5 w-full md:w-1/2 mb-4 md:mb-0'>
            <div>
              <span className='font-bold text-xl'>
                Track Your Email Campaigns
              </span>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>
                Smart Email Automation: Save Time, Stay Connected, and
                Boost <br />
                Engagement Effortlessly
              </p>
            </div>
            <div className='flex items-center'>
              <button
                onClick={handleToggleModal}
                className='px-8 py-2 bg-orange-gradient text-white rounded-xl'
              >
                Create Campaign
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
        {/* stats */}
        <div className='mt-6 md:mt-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6'>
            {stats.map((stat, index) => (
              <div
                key={index}
                className='w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg p-4 border border-gray-100'
              >
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-gray-700 font-medium text-sm'>
                    {stat.title}
                  </span>
                  <div
                    className={`flex items-center ${
                      stat.trend === "up"
                        ? "text-green-600"
                        : "text-red-600"
                    } text-xs font-semibold px-2 py-0.5 rounded-full ${
                      stat.trend === "up" ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    <Icon
                      icon={
                        stat.trend === "up"
                          ? "heroicons:arrow-trending-up"
                          : "heroicons:arrow-trending-down"
                      }
                      className='mr-0.5'
                      width='14'
                    />
                    {stat.trend === "up" ? "+" : ""}
                    {stat.change}%
                  </div>
                </div>

                <div className='text-2xl font-bold mb-1'>
                  {stat.title.includes("Rate")
                    ? `${stat.value}%`
                    : stat.value.toLocaleString()}
                </div>
                <div>
                  <small>{stat.fromText}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* reports */}

        {/* to do:
        - reports
        - analytics
        - email performance */}
        <CampaignReports />
        <EmailPerfomanceChart />
      </div>
    </>
  );
};
export default ExistingEmailStats;
