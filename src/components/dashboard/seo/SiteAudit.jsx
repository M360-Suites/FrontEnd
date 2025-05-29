import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  auditResult,
  issues,
  pagesCrawledData,
} from "../../../utils/dummyData";
const SiteAudit = () => {
  const [progress, setProgress] = useState(0);
  const targetProgress = 20;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetProgress);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${progress}%`,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className='p-4 sm:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 min-h-screen bg-gray-50'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {/* Header */}
      <motion.div
        className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-sm'
        variants={itemVariants}
      >
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6'>
          <h1 className='text-xl lg:text-2xl font-bold text-gray-800'>
            Site Audit
          </h1>
          <span className='text-orange-500 cursor-pointer hover:text-orange-600 transition-colors text-sm lg:text-base'>
            www.m360solutions.com
          </span>
        </div>

        <div className='flex gap-3 w-full sm:w-auto'>
          <motion.button
            className='bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-colors flex-1 sm:flex-none'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='flex items-center justify-center gap-2'>
              <Icon icon='mdi:refresh' className='text-lg' />
              Re-Run
            </span>
          </motion.button>
          <motion.button
            className='border border-gray-300 hover:border-gray-400 hover:bg-gray-50 px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-colors flex-1 sm:flex-none'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='flex items-center justify-center gap-2'>
              <Icon icon='mdi:plus' className='text-lg' />
              Add Project
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div variants={itemVariants}>
        <div className='w-full bg-gray-200 h-10 lg:h-12 rounded-full overflow-hidden shadow-inner'>
          <motion.div
            className='bg-orange-500 h-full rounded-full flex items-center justify-end pr-4'
            variants={progressVariants}
            initial='hidden'
            animate='visible'
          >
            <span className='text-white font-bold text-sm lg:text-base'>
              {progress}%
            </span>
          </motion.div>
        </div>
        <motion.div
          className='text-gray-500 mt-2 flex items-center gap-2'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Icon icon='mdi:loading' className='animate-spin' />
          Audit in progress
        </motion.div>
      </motion.div>

      {/* Audit Results Grid */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6'
        variants={itemVariants}
      >
        {auditResult.map((item, index) => (
          <motion.div
            key={item.name}
            className='bg-white p-4 lg:p-6 hover:shadow-md transition-shadow'
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: {
                  delay: index * 0.1,
                  duration: 0.5,
                },
              },
            }}
            whileHover={{ y: -5 }}
          >
            <div className='flex items-center gap-3 mb-3'>
              <Icon icon={item.icon} className='text-2xl text-gray-600' />
              <span className='font-semibold text-lg text-gray-800'>
                {item.name}
              </span>
            </div>
            <hr className='mb-3 border-gray-200' />
            <motion.h1
              className='text-2xl lg:text-3xl font-bold text-gray-900 mb-2'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              {item.name === "Pages Crawled" ||
              item.name === "Backlinks" ||
              item.name === "Organic Keywords" ||
              item.name === "Monthly Traffic"
                ? item.percentage
                : `${item.percentage}%`}
            </motion.h1>
            {item.status && (
              <p className={`${item.color} font-medium`}>{item.status}</p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Issues and Charts Section */}
      <motion.div
        className='flex flex-col lg:flex-row gap-6 lg:gap-8'
        variants={itemVariants}
      >
        {/* Issues Panel */}
        <motion.div
          className='flex-1 lg:max-w-2xl bg-white overflow-hidden'
          whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <div className='p-4 lg:p-6'>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6'>
              <h2 className='text-xl font-bold text-gray-800'>
                SEO Issues Discovered
              </h2>
              <span className='text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full'>
                200 Top Issues Discovered
              </span>
            </div>

            <div className='space-y-4'>
              {issues.map((item, index) => (
                <motion.div
                  key={item.name}
                  className='flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors'
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className='flex items-center gap-3'>
                    <Icon
                      icon={item.icon}
                      className={`text-xl ${item.color}`}
                    />
                    <h3 className='font-medium text-gray-800'>
                      {item.name}
                    </h3>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === "error"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className='font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full'>
                      {item.number}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className='w-full sm:w-auto mt-6 bg-gray-400 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors font-medium'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className='flex items-center justify-center gap-2'>
                <Icon icon='mdi:eye' />
                View All Issues
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Pages Crawled Chart */}
        <motion.div
          className='flex-1 lg:max-w-md bg-white overflow-hidden'
          whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <div className='p-4 lg:p-6'>
            <h2 className='text-xl font-bold text-gray-800 mb-6'>
              Pages Crawled
            </h2>

            <div className='space-y-4'>
              {pagesCrawledData.map((data, index) => (
                <motion.div
                  key={data.date}
                  className='flex items-center justify-between'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1, type: "spring" }}
                >
                  <span className='font-medium text-gray-600'>
                    {data.date}
                  </span>
                  <div className='flex gap-4'>
                    <div className='text-center'>
                      <div className='text-sm text-gray-500'>Crawled</div>
                      <div className='font-bold text-blue-600'>
                        {data.crawled}
                      </div>
                    </div>
                    <div className='text-center'>
                      <div className='text-sm text-gray-500'>Indexed</div>
                      <div className='font-bold text-green-600'>
                        {data.indexed}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <div className='flex items-center gap-2 mb-2'>
                <Icon icon='mdi:information' className='text-blue-600' />
                <span className='font-medium text-blue-800'>
                  Crawl Summary
                </span>
              </div>
              <p className='text-sm text-blue-700'>
                {pagesCrawledData[pagesCrawledData.length - 1].crawled}{" "}
                pages total, with{" "}
                {(
                  (pagesCrawledData[pagesCrawledData.length - 1].indexed /
                    pagesCrawledData[pagesCrawledData.length - 1]
                      .crawled) *
                  100
                ).toFixed(1)}
                % indexation rate
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SiteAudit;
