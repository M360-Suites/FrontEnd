import React, { useState } from "react";
import Button from "../../components/ui/Button";
import OTPinput from "../../components/ui/OTPinput";

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOtpComplete = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      // Here you would typically make an API call to verify the OTP
      // For example:
      // verifyOtp(otp).then(() => {
      //   // Handle successful verification
      // }).catch(error => {
      //   // Handle error
      // }).finally(() => {
      //   setIsVerifying(false);
      // });
      
      // For demo purposes:
      setTimeout(() => {
        setIsVerifying(false);
        // Navigate or show success message
      }, 1500);
    }
  };

  const handleResendCode = () => {
    // Implement resend code functionality here
    console.log("Resending code...");
  };

  return (
    <div className='max-w-md'>
      <div>
        <h1 className='text-3xl font-bold text-gray-800'>
          Enter Code sent to your Email{" "}
        </h1>
        <br />
        <small className='text-gray-500 text-base mt-2 block'>
          No credit card needed, No software installation.
        </small>
      </div>

      <div className='space-y-10 mt-5'>
        <div>
          <small className='text-gray-500 text-sm font-bold'>
            Enter 6-digit code to your email
          </small>
        </div>
        
        <div className="py-2">
          <OTPinput 
            onComplete={handleOtpComplete}
            onChange={setOtp}
            autoFocus={true}
            containerClassName="mb-4"
          />
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleResendCode}
              className="text-primary-orange text-sm hover:underline"
            >
              Didn't receive a code? Resend
            </button>
          </div>
        </div>

        <div>
          <Button
            className={`bg-primary-orange w-full px-2 py-5 rounded-xl ${otp.length !== 6 ? 'opacity-70 cursor-not-allowed' : ''}`}
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
