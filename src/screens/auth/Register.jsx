import { useState, useEffect } from "react";
import { signUp } from "../../functions/authFunctions";
import Button from "../../components/ui/Button";
import { Icon } from "@iconify/react";
import { getCookie, removeCookie } from "../../utils/cookies";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    companyUrl: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [verificationToken, setVerificationToken] = useState("");
  const navigate = useNavigate();

  // Get verification token from cookie on component mount
  useEffect(() => {
    const token = getCookie("verificationToken");
    if (token) {
      setVerificationToken(token);
      console.log("Verification token retrieved:", token);
    } else {
      // If no token found, redirect to verification
      console.warn(
        "No verification token found, redirecting to verification"
      );
      navigate("/verify");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.companyUrl.trim()) {
      newErrors.companyUrl = "Company URL is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    if (!verificationToken) {
      newErrors.token =
        "Verification token is missing. Please verify your email first.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const res = await signUp({
        companyName: formData.companyName,
        email: formData.email,
        token: verificationToken,
        companyUrl: formData.companyUrl,
        password: formData.password,
      });

      console.log("Registration successful:", res);

      // Clear verification token cookie after successful registration
      removeCookie("verificationToken");

      // Handle successful registration (redirect to dashboard, login, etc.)
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);

      // Handle different types of errors
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else if (error.response?.status === 409) {
        setErrors({
          submit:
            "An account with this email or company URL already exists",
        });
      } else if (error.response?.status === 401) {
        setErrors({
          submit:
            "Invalid verification token. Please verify your email again.",
        });
        // Redirect back to verification if token is invalid
        setTimeout(() => navigate("/verify"), 2000);
      } else {
        setErrors({ submit: "Registration failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='max-w-md md:mt-0 mt-10'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>
          One step to your customized platform
        </h1>
        <small className='text-gray-500 text-base mt-2 block'>
          Personalize your platform for a better experience
        </small>
      </div>

      <form onSubmit={handleSubmit} className='space-y-3'>
        {/* Display general errors */}
        {errors.submit && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl'>
            {errors.submit}
          </div>
        )}

        {/* Display token error */}
        {errors.token && (
          <div className='bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl'>
            {errors.token}
          </div>
        )}

        {/* Company Name */}
        <div>
          <label
            htmlFor='companyName'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Company's name
          </label>
          <div
            className={`w-full border rounded-xl overflow-hidden transition-all duration-300 ${
              errors.companyName ? "border-red-300" : "border-gray-300"
            }`}
          >
            <input
              id='companyName'
              name='companyName'
              type='text'
              placeholder='Enter Your Company Name'
              className='w-full px-4 py-3 sm:py-3.5 outline-none text-sm md:text-base'
              required
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          {errors.companyName && (
            <p className='text-xs text-red-500 mt-1'>
              {errors.companyName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Email Address
          </label>
          <div
            className={`w-full border rounded-xl overflow-hidden transition-all duration-300 ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
          >
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Enter Your Email'
              className='w-full px-4 py-3 sm:py-3.5 outline-none text-sm md:text-base'
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <p className='text-xs text-red-500 mt-1'>{errors.email}</p>
          )}
        </div>

        {/* Company URL */}
        <div>
          <label
            htmlFor='companyUrl'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Company URL
          </label>
          <div
            className={`w-full border rounded-xl overflow-hidden transition-all duration-300 ${
              errors.companyUrl ? "border-red-300" : "border-gray-300"
            }`}
          >
            <div className='flex items-center'>
              <span className='text-gray-500 pl-4'>https://</span>
              <input
                id='companyUrl'
                autoComplete='off'
                name='companyUrl'
                type='text'
                placeholder='yourcompany.m360.com'
                className='w-full px-2 py-3 sm:py-3.5 outline-none text-sm md:text-base'
                required
                value={formData.companyUrl}
                onChange={handleChange}
              />
            </div>
          </div>
          {errors.companyUrl ? (
            <p className='text-xs text-red-500 mt-1'>
              {errors.companyUrl}
            </p>
          ) : (
            <p className='text-xs text-gray-500 mt-1'>
              This will be your unique URL for accessing your platform
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Create Password
          </label>
          <div
            className={`w-full border rounded-xl overflow-hidden transition-all duration-300 ${
              errors.password ? "border-red-300" : "border-gray-300"
            }`}
          >
            <div className='flex items-center'>
              <input
                id='password'
                autoComplete='new-password'
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder='Enter Password'
                className='w-full px-4 py-3 sm:py-3.5 outline-none text-sm md:text-base'
                required
                value={formData.password}
                onChange={handleChange}
                minLength={8}
              />
              <button
                type='button'
                className='pr-4'
                onClick={togglePasswordVisibility}
              >
                <Icon
                  icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                  className='h-5 w-5 text-gray-500'
                />
              </button>
            </div>
          </div>
          {errors.password ? (
            <p className='text-xs text-red-500 mt-1'>{errors.password}</p>
          ) : (
            <p className='text-xs text-gray-500 mt-1'>
              Password must be at least 8 characters
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor='confirmPassword'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Confirm Password
          </label>
          <div
            className={`w-full border rounded-xl overflow-hidden transition-all duration-300 ${
              errors.confirmPassword ? "border-red-300" : "border-gray-300"
            }`}
          >
            <div className='flex items-center'>
              <input
                id='confirmPassword'
                autoComplete='new-password'
                name='confirmPassword'
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm Password'
                className='w-full px-4 py-3 sm:py-3.5 outline-none text-sm md:text-base'
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type='button'
                className='pr-4'
                onClick={toggleConfirmPasswordVisibility}
              >
                <Icon
                  icon={showConfirmPassword ? "mdi:eye-off" : "mdi:eye"}
                  className='h-5 w-5 text-gray-500'
                />
              </button>
            </div>
          </div>
          {errors.confirmPassword && (
            <p className='text-xs text-red-500 mt-1'>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className='flex items-start mt-6'>
          <div className='flex items-center h-5'>
            <input
              id='terms'
              name='terms'
              type='checkbox'
              className={`h-4 w-4 text-primary-orange border-gray-300 rounded focus:ring-primary-orange ${
                errors.terms ? "border-red-300" : ""
              }`}
              checked={agreeToTerms}
              onChange={() => {
                setAgreeToTerms(!agreeToTerms);
                if (errors.terms) {
                  setErrors((prev) => ({ ...prev, terms: "" }));
                }
              }}
              required
            />
          </div>
          <div className='ml-3 text-sm'>
            <label htmlFor='terms' className='text-gray-600'>
              I agree to the{" "}
              <Link
                to='/terms'
                className='text-primary-orange hover:underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href='/privacy'
                className='text-primary-orange hover:underline'
                target='_blank'
                rel='noopener noreferrer'
              >
                Privacy Policy
              </Link>
            </label>
            {errors.terms && (
              <p className='text-xs text-red-500 mt-1'>{errors.terms}</p>
            )}
          </div>
        </div>

        {/* Create Account Button */}
        <div className='pt-4'>
          <Button
            type='submit'
            className={`w-full py-4 rounded-xl transition-colors duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-light-orange hover:bg-orange-600"
            }`}
            title={isLoading ? "Creating Account..." : "Create Account"}
            disabled={isLoading}
          />
        </div>

        {/* Already have an account */}
        <div className='text-center mt-4'>
          <p className='text-gray-600'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='text-primary-orange font-semibold hover:underline'
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
