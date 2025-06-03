import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { requestTrial } from "../../functions/authFunctions";
import { useState } from "react";
import { setCookie } from "../../utils/cookies";

const Onboarding = () => {
  const [email, setEmail] = useState(""); 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRequest = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    try {
      setLoading(true);
      setError(false);
      const res = await requestTrial(email);
      console.log(res);
      
      // Store email in cookie for verification page
      setCookie('verificationEmail', email, 1); // Store for 1 day
      
      // Navigate to verification page
      navigate("/verify");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='mb-4'>
        <h1 className='text-3xl font-bold text-gray-800'>
          Start your free trial today!
        </h1>
        <small className='text-gray-500 text-base mt-2 block'>
          No credit card needed, No software installation.
        </small>
      </div>

      <div className='mt-4'>
        <p className='text-gray-600 leading-relaxed'>
          Unlock your business growth with streamlined marketing and
          automation. Save time, boost engagement, and grow effortlessly.
        </p>
      </div>

      {/* Display error if exists */}
      {error && (
        <div className='mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
          {error}
        </div>
      )}

      {/* Email signup form */}
      <div className='mt-8 w-full sm:w-[350px] md:w-[400px] lg:w-[450px] border border-gray-300 rounded-xl flex overflow-hidden transition-all duration-300'>
        <div className='flex-grow'>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            type='email'
            placeholder='Email'
            className='w-full h-full px-4 py-3 sm:py-3.5 md:py-4 outline-none text-sm md:text-base'
            required
          />
        </div>
        <div>
          <Button
            onClick={handleRequest}
            disabled={loading} 
            className='bg-light-orange hover:bg-orange-600 transition-colors duration-300 h-full text-sm md:text-base px-3 md:px-6'
            title={loading ? "Sending..." : "Sign Up"}
          />
        </div>
      </div>

      <div className='mt-4'>
        <p className='text-gray-600'>
          Already have an account?{" "}
          <span className='font-bold'>
            <Link to={"/login"} className='hover:underline'>
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;