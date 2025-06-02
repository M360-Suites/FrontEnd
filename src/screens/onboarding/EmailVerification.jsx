import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import { verifyCode, requestTrial } from "../../functions/authFunctions";
import { useNavigate } from "react-router-dom";
import OTPinput from "../../components/ui/OTPinput";
import { getCookie, removeCookie, setCookie } from "../../utils/cookies";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get email from cookie on component mount
  useEffect(() => {
    const storedEmail = getCookie('verificationEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect to onboarding
      navigate('/');
    }
  }, [navigate]);

  const handleOtpComplete = (value) => {
    setOtp(value);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    try {
      setIsVerifying(true);
      setError("");
      
      const res = await verifyCode(email, 'trial', otp);
      console.log(res);
      
      // Extract token from response
      const token = res.data.data
      
      if (token) {
        // Store the verification token in cookie
        setCookie('verificationToken', token, 1);
        console.log("Token saved:", token);
      } else {
        console.warn("No token found in response:", res.data);
      }
      
      // Clear the email cookie after successful verification
      removeCookie('verificationEmail');
      
      // Navigate to register page
      setTimeout(() => {
        setIsVerifying(false);
        navigate("/register");
      }, 1500);
      
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Verification failed. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) return;

    try {
      setIsResending(true);
      setError("");
      
      await requestTrial(email);
      console.log("Code resent successfully");
      
      // Show success message
      setError("Code sent successfully!");
      setTimeout(() => setError(""), 3000);
      
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart.charAt(0) + '*'.repeat(Math.max(0, localPart.length - 2)) + localPart.charAt(localPart.length - 1);
    return `${maskedLocal}@${domain}`;
  };

  return (
    <div className='max-w-md'>
      <div>
        <h1 className='text-3xl font-bold text-gray-800'>
          Enter Code sent to your Email
        </h1>
        <br />
        <small className='text-gray-500 text-base mt-2 block'>
          We sent a 6-digit code to {maskEmail(email)}
        </small>
      </div>

      <div className='space-y-10 mt-5'>
        <div>
          <small className='text-gray-500 text-sm font-bold'>
            Enter 6-digit code from your email
          </small>
        </div>

        {/* Display error if exists */}
        {error && (
          <div className={`p-3 border rounded ${
            error.includes('successfully') 
              ? 'bg-green-100 border-green-400 text-green-700'
              : 'bg-red-100 border-red-400 text-red-700'
          }`}>
            {error}
          </div>
        )}

        <div className='py-2'>
          <OTPinput
            onComplete={handleOtpComplete}
            onChange={setOtp}
            autoFocus={true}
            containerClassName='mb-4'
          />

          <div className='flex justify-center mt-4'>
            <button
              onClick={handleResendCode}
              disabled={isResending}
              className='text-primary-orange text-sm hover:underline disabled:opacity-70'
            >
              {isResending ? "Sending..." : "Didn't receive a code? Resend"}
            </button>
          </div>
        </div>

        <div>
          <Button
            className={`bg-primary-orange w-full px-2 py-5 rounded-xl ${
              otp.length !== 6 ? "opacity-70 cursor-not-allowed" : ""
            }`}
            title={isVerifying ? "Verifying..." : "Verify"}
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;