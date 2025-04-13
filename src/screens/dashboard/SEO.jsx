import { seo } from "../../assets";

const SEO = () => {
  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row justify-around items-center border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm'>
        <div className='flex flex-col gap-5 w-full md:w-1/2 mb-6 md:mb-0'>
          <div>
            <span className='font-bold text-xl md:text-2xl'>
              Monitor your site performance and health with our <br /> SEO
              tools
            </span>
          </div>
          <div>
            <p className='text-gray-500 text-sm md:text-base'>
              Comprehensive analysis of your website’s SEO health and
              performance
            </p>
          </div>
          <div className='flex items-center'>
            <button className='px-6 py-2 md:px-8 md:py-3 bg-orange-gradient text-white rounded-xl'>
              Upgrade to use more SEO tools
            </button>
          </div>
        </div>

        <div className='w-full md:w-1/2 flex justify-center'>
          <img src={seo} alt='SEO Tools' className='max-w-full h-auto' />
        </div>
      </div>

      {/* input section */}

      <div className='mt-10 p-4'>
        <div className='mb-4'>
          <span className=''>
            Enter your website URL to generate site health status
          </span>
        </div>
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-1 border bg-white border-gray-400 rounded-xl p-4'>
            <input
              className='w-full py-2 px-4 outline-none'
              type='text'
              placeholder='Enter your website URL'
            />
          </div>
          <div className='md:w-[250px] w-full md:mt-0'>
            <button className='bg-light-orange w-full h-full py-2 rounded-md text-white'>
              Analyze
            </button>
          </div>
        </div>
      </div>

      {/* data if exists */}
    </div>
  );
};
export default SEO;
