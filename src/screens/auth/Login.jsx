import { RoundTable } from "../../assets/index";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className='flex justify-center items-center mx-auto min-h-screen px-4 py-12 mt-[-80px]'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl w-full'>
        {/* Image and list section - hidden on mobile, visible on desktop */}
        <div className='hidden md:block md:w-1/2'>
          <div className='w-[570px] h-[570px] max-w-full'>
            <img
              className='w-full h-full object-cover'
              src={RoundTable}
              alt='RoundTable'
            />
          </div>
          <div className="mt-4">
            <ul className="space-y-5 text-gray-700 font-medium">
              <li className="flex items-center">
                <span className="mr-2 text-primary-orange">✓</span>
                Trusted by over 200 companies and SMEs
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary-orange">✓</span>
                Making Marketing Easier
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-primary-orange">✓</span>
                Enhancing Business growth
              </li>
            </ul>
          </div>
        </div>

        {/* Form section - full width on mobile, half width on desktop */}
        <div className='w-full md:w-1/2 flex flex-col justify-center'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
