import { useState, useEffect } from "react";
import { requestOTP, verifyCode } from "../../functions/authFunctions";
import { getCookie, setCookie } from "../../utils/cookies";
import Button from "../../components/ui/Button";
import OTPinput from "../../components/ui/OTPinput";
import { useNavigate } from "react-router-dom";
const ResetPassOTP = () => {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = getCookie("resetEmail");
    setEmail(email);
    // console.log("Retrieved reset mail", email);
  }, []);

  const handleOtpComplete = (value) => {
    setCode(value);
  };

  const handleVerify = async () => {
    if (code.length === 6) {
      setIsVerifying(true);
      try {
        const res = await verifyCode(email, "forgetPassword", code);
        // console.log(res.data.data);
        const resetToken = res.data.data;
        setCookie("resetToken", resetToken, 1);
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.message);
      }

      setTimeout(() => {
        setIsVerifying(false);
      }, 3000);
      navigate("/change-password");
    }
  };

  const handleResendCode = async () => {
    try {
      const res = await requestOTP(email, "forgetPassword");
      // console.log(res)
      setStatus(res.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    const maskedLocal =
      localPart.charAt(0) +
      "*".repeat(Math.max(0, localPart.length - 2)) +
      localPart.charAt(localPart.length - 1);
    return `${maskedLocal}@${domain}`;
  };
  return (
    <div className='max-w-md'>
      <div>
        <h1 className='text-3xl font-bold text-gray-800'>
          Enter Code sent to {maskEmail(email)}
        </h1>
        <br />
        <small className='text-gray-500 text-base mt-2 block'>
          No credit card needed, No software installation.
        </small>
      </div>
      {status && (
        <div className='text-green-700 border border-green-500 rounded-lg mt-5 p-4'>
          <p>{status}</p>
        </div>
      )}
      {error && (
        <div className='text-red-500 border-red-400 p-2 mt-3 border rounded-lg'>
          <p>{error}</p>
        </div>
      )}
      <div className='space-y-10 mt-5'>
        <div>
          <small className='text-gray-500 text-sm font-bold'>
            Enter 6-digit code to your email
          </small>
        </div>

        <div className='py-2'>
          <OTPinput
            onComplete={handleOtpComplete}
            onChange={setCode}
            autoFocus={true}
            containerClassName='mb-4'
          />

          <div className='flex justify-center mt-4'>
            <button
              onClick={handleResendCode}
              disabled={isVerifying}
              className='text-primary-orange text-sm hover:underline'
            >
              Didn't receive a code? Resend
            </button>
          </div>
        </div>

        <div>
          <Button
            className={`bg-primary-orange w-full px-2 py-5 rounded-xl ${
              code.length !== 6 ? "opacity-70 cursor-not-allowed" : ""
            }`}
            title={isVerifying ? "Verifying..." : "Recover Account"}
            onClick={handleVerify}
            disabled={code.length !== 6 || isVerifying}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassOTP;
