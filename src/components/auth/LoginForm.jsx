import { useState } from "react";
import { Icon } from "@iconify/react";
import { Google } from "../../assets/index";
import Button from "../ui/Button";
import { login } from "../../functions/authFunctions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/UseAuth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      
      const res = await login({
        email: formData.email,
        password: formData.password,
      });
      
      console.log(res);
      
      // Handle different possible response structures
      const authToken = res.data.accessToken
      const userData = res.data.user;

      if (authToken) {
        // Use AuthContext login method to set global state
        authLogin(userData, authToken);
        
        // Navigate to intended destination
        navigate(from, { replace: true });
      } else {
        setError("No authentication token received. Please try again.");
      }
    } catch (error) {
      setError(error.response.data.message);
      // console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Your Google auth logic here
      const res = await googleAuth();
      // Handle Google auth response similar to regular login
      
    } catch (error) {
      setError("Google authentication failed. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-md mx-auto'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>
        Welcome Back!
      </h1>
      {error && (
        <div className='p-3 mb-4 border rounded border-red-400 bg-red-50 text-red-700'>
          {error}
        </div>
      )}
      
      {/* Email Input */}
      <div className='mb-4'>
        <label
          htmlFor='email'
          className='text-gray-700 font-medium block mb-1'
        >
          Email
        </label>
        <input
          suggested='email'
          autoComplete='email'
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Enter your email'
          className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500'
          required
          disabled={loading}
        />
      </div>

      {/* Password Input */}
      <div className='mb-4'>
        <label
          htmlFor='password'
          className='text-gray-700 font-medium block mb-1'
        >
          Enter Password
        </label>
        <div className='relative'>
          <input
            id='password'
            autoComplete='current-password'
            name='password'
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500'
            required
            disabled={loading}
          />
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            <Icon
              icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
              width={24}
            />
          </button>
        </div>
        <div className='text-right mt-2'>
          <Link
            to='/forgot-password'
            className='text-orange-500 text-sm font-medium hover:underline'
          >
            Forgot password?
          </Link>
        </div>
      </div>

      {/* Login Button */}
      <div className='mt-6'>
        <Button
          type='submit'
          disabled={loading}
          title={loading ? "Logging you in..." : "Login"}
          className={`w-full py-3 text-lg font-semibold rounded-xl transition-all ${
            loading 
              ? 'bg-orange-400 cursor-not-allowed' 
              : 'bg-orange-500 hover:bg-orange-600'
          } text-white`}
        />
      </div>

      {/* OR Divider */}
      <div className='flex items-center my-6'>
        <div className='flex-grow border-t border-gray-300'></div>
        <span className='mx-4 text-gray-500'>or</span>
        <div className='flex-grow border-t border-gray-300'></div>
      </div>

      {/* Google Login Button */}
      {/* <button
        type='button'
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl transition-all ${
          loading 
            ? 'bg-gray-100 cursor-not-allowed opacity-50' 
            : 'hover:bg-gray-100'
        }`}
      >
        <img src={Google} alt='Google Logo' className='w-6 h-6 mr-2' />
        <span className='text-gray-700 font-medium'>
          {loading ? 'Please wait...' : 'Continue with Google'}
        </span>
      </button> */}

      {/* Sign up link */}
      <div className='text-center mt-6'>
        <p className='text-gray-600'>
          Don't have an account?{" "}
          <Link
            to='/'
            className='text-orange-500 font-semibold hover:underline'
          >
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;