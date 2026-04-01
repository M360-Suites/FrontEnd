import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import {
	verifyCode,
	requestTrial,
} from "../../functions/authFunctions";
import { useNavigate } from "react-router-dom";
import OTPinput from "../../components/ui/OTPinput";
import {
	getCookie,
	removeCookie,
	setCookie,
} from "../../utils/cookies";
import { fr } from "../../assets";

const EmailVerification = () => {
	const [otp, setOtp] = useState("");
	const [isVerifying, setIsVerifying] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	// Get email from cookie on component mount
	useEffect(() => {
		const storedEmail = getCookie("verificationEmail");
		if (storedEmail) {
			setEmail(storedEmail);
		} else {
			// If no email found, redirect to onboarding
			navigate("/");
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

			const res = await verifyCode(email, "trial", otp);
			console.log(res);

			// Extract token from response
			const token = res.data.data;

			if (token) {
				// Store the verification token in cookie
				setCookie("verificationToken", token, 1);
				console.log("Token saved:", token);
			} else {
				console.warn("No token found in response:", res.data);
			}

			// Clear the email cookie after successful verification
			removeCookie("verificationEmail");

			// Navigate to register page
			setTimeout(() => {
				setIsVerifying(false);
				navigate("/register");
			}, 1000);
		} catch (error) {
			console.log(error);
			setError(
				error.response?.data?.message ||
					"Verification failed. Please try again.",
			);
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
			setError(
				error.response?.data?.message ||
					"Failed to resend code. Please try again.",
			);
		} finally {
			setIsResending(false);
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
		<div className='min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-blue-100 flex flex-col items-center justify-center p-4'>
			{/* Main Content Container */}
			<div className='z-10 w-full max-w-2xl text-center flex flex-col items-center'>
				{/* Title */}
				<h1 className='text-3xl md:text-5xl font-bold text-blue-900 mb-6'>
					Enter <span className='text-orange-300'>code</span> sent to
					your Email
				</h1>

				{/* Description */}
				<p className='text-gray-600 text-base md:text-lg max-w-xl mx-auto mb-2 leading-relaxed'>
					Unlock your business growth with streamline marketing and
					automation. Save time, boost engagement, and grow
					effortlessly
				</p>

				{/* Trial Info */}
				<p className='text-gray-500 text-sm mb-10'>
					Try 14 days free trial, auto renews monthly{" "}
					<span className='text-blue-600 underline cursor-pointer'>
						cancel anytime
					</span>
				</p>

				{/* Display error if exists */}
				{error && (
					<div
						className={`mb-6 p-3 border rounded-lg max-w-md mx-auto w-full ${
							error.includes("successfully")
								? "bg-green-100 border-green-400 text-green-700"
								: "bg-red-100 border-red-400 text-red-700"
						}`}
					>
						{error}
					</div>
				)}

				{/* Form Container */}
				<div className='w-full max-w-md mx-auto'>
					<div className='mb-8'>
						{/* OTP Input */}
						<div className='flex justify-center'>
							<OTPinput
								onComplete={handleOtpComplete}
								onChange={setOtp}
								autoFocus={true}
								containerClassName='flex gap-2 md:gap-3 justify-center'
								inputClassName='w-10 h-10 md:w-12 md:h-12 border border-blue-200 rounded-lg text-center text-xl font-semibold text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all'
							/>
						</div>

						<div className='mt-4 text-sm text-gray-500'>
							Enter 6- digit code sent to {maskEmail(email)}
						</div>
					</div>

					<div className='mb-6'>
						<Button
							className={`w-full py-4 rounded-xl text-white font-semibold text-lg shadow-lg shadow-blue-500/20 transition-all duration-300 ${
								otp.length !== 6 || isVerifying
									? "bg-blue-400 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							}`}
							title={isVerifying ? "Verifying..." : "Verify"}
							onClick={handleVerify}
							disabled={otp.length !== 6 || isVerifying}
						/>
					</div>

					<div className='flex justify-center'>
						<button
							onClick={handleResendCode}
							disabled={isResending}
							className='text-gray-500 hover:text-blue-600 text-sm transition-colors disabled:opacity-50 font-medium'
						>
							{isResending
								? "Sending..."
								: "Didn't receive a code? Resend"}
						</button>
					</div>
				</div>
			</div>

			{/* Illustration Bottom Left - Absolutely positioned */}
			<div className='fixed md:absolute bottom-0 left-0 w-[700px] max-w-[55vw] z-0 opacity-100 pointer-events-none'>
				<img
					src={fr}
					alt='Decoration'
					className='w-full h-auto object-bottom'
				/>
			</div>
		</div>
	);
};

export default EmailVerification;
