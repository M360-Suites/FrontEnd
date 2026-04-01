import Button from "../../components/ui/Button";
import { requestOTP } from "../../functions/authFunctions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../utils/cookies";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(false);
  const Navigate = useNavigate();
  const handleRequest = async () => {
    try {
      setLoading(true);
      const res = await requestOTP(email, "forgetPassword");
      setCookie("resetEmail", email, 1);
      console.log(res);
      setStatus(res.data.message);
      setTimeout(() => {
      Navigate("/enter-otp");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Forgot Password?{" "}
        </h1>
        <small className='text-gray-500 text-base mt-2 block'>
          Get your account back in one step
        </small>
      </div>

      <div className='mt-4'>
        <p className='text-gray-600 leading-relaxed'>
          No stress! Enter your email to reset your password. <br />
          We've got you covered.
        </p>
      </div>

      {status && (
        <div className='text-green-700 border border-green-500 rounded-lg mt-5 p-4'>
          <p>{status}</p>
        </div>
      )}
         {error && (
        <div className='text-red-700 border border-red-500 rounded-lg mt-5 p-4'>
          <p>{error}</p>
        </div>
      )}

      {/* Email signup form */}
      <div className='mt-8 w-full max-w-md flex flex-col sm:flex-row gap-4 sm:gap-0 sm:border sm:border-gray-300 sm:rounded-xl sm:overflow-hidden transition-all duration-300'>
        <div className='flex-grow border border-gray-300 sm:border-none rounded-xl sm:rounded-none overflow-hidden'>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Enter your email address'
            className='w-full h-full px-4 py-3.5 sm:py-4 outline-none text-gray-700 text-sm md:text-base'
            required
          />
        </div>
        <div className='w-full sm:w-auto'>
          <Button
            onClick={handleRequest}
            className='w-full sm:w-auto bg-light-orange hover:bg-orange-600 text-white transition-colors duration-300 py-3.5 sm:py-0 sm:h-full text-sm md:text-base px-6 rounded-xl sm:rounded-none font-medium shadow-md sm:shadow-none shadow-orange-500/20'
            title={loading ? "Sending..." : "Reset Password"}
          />
        </div>
      </div>
      {/* <Link to={"/enter-otp"}>Next</Link> */}
    </div>
  );
};

export default ForgotPassword;
