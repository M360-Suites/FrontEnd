import { Icon } from "@iconify/react/dist/iconify.js";
import { Analytics } from "../../assets";
import { dashBoardCardsData } from "../../utils/data";
import ExistingUserStats from "../../components/dashboard/ExistingUserStats";
import { useAuth } from "../../context/UseAuth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const isNewUser = false;

  const { user } = useAuth();
  // console.log(user);

  return (
    <>
      {isNewUser ? (
        <div className='md:ml-[223px] transition-all duration-300 pt-6 px-4 md:px-6'>
          {/* Dashboard cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6'>
            {dashBoardCardsData.map((item, index) => (
              <div
                key={index}
                className='bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200'
              >
                <div className='flex items-center justify-between w-full'>
                  <div className='flex-shrink-0 w-12 h-12 flex items-center'>
                    <img
                      src={item.icon}
                      alt={item.title}
                      className='max-w-full max-h-full'
                    />
                  </div>
                  <div>
                    <Link to={item.link}>
                      <Icon
                        icon={"gg:arrow-up-o"}
                        className='text-xl text-gray-500'
                      />
                    </Link>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  <div className='flex-grow'>
                    <h2 className='text-lg font-semibold text-gray-800'>
                      {item.title}
                    </h2>
                    <p className='text-sm text-gray-600 mt-1'>
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics placeholder  */}
          <div className='flex flex-col items-center justify-center mt-4'>
            <div className='w-full max-w-[260px] md:max-w-[300px] mx-auto'>
              <img
                className='w-full h-auto object-contain'
                src={Analytics}
                alt='Analytics placeholder'
              />
            </div>
            <div className='md:mt-[-30px] mt-[-50px] text-center'>
              <span className='text-xl md:text-[30px] font-bold text-gray-400'>
                Your Analytics Will Appear Here
              </span>
            </div>
          </div>
        </div>
      ) : (
        <ExistingUserStats user={user} />
      )}
    </>
  );
};

export default Dashboard;
