import { Link } from "react-router-dom";
import { Pop } from "../../assets";
import Button from "./Button";

const SuccessCard = ({ className }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
      <div
        className={`${className} card border border-solid rounded-xl bg-white p-6 md:p-10 flex flex-col items-center justify-center w-full max-w-[286px] md:max-w-[562px]`}
      >
        <div className='w-[100px] h-[100px] md:w-[175px] md:h-[175px] mx-auto'>
          <img
            className='w-full h-full object-contain'
            src={Pop}
            alt='Success'
          />
        </div>

        <div className='mt-6 md:mt-10 text-center'>
          <h2 className='font-semibold text-xl md:text-2xl mb-2'>
            Your account is back
          </h2>
          <p className='text-sm md:text-base font-light text-gray-500 mb-6 md:mb-8'>
            We are glad to have you back on track
          </p>
          <Link to={"/login"}>
            <Button
              title={"Back To Login"}
              className={
                "bg-primary-orange text-white py-3 md:py-4 px-4 md:px-8 rounded-lg w-full md:w-[250px] lg:w-[300px] text-base md:text-lg font-medium hover:bg-light-orange transition-colors duration-300"
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessCard;
