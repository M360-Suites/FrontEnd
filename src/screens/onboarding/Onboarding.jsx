import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { requestTrial } from "../../functions/authFunctions";
import { useState } from "react";
import { setCookie } from "../../utils/cookies";
import { fr } from "../../assets";

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
			setCookie("verificationEmail", email, 1); // Store for 1 day

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
		<div className='min-h-screen overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-blue-100 flex flex-col'>
			{/* Two-column layout */}
			<div className='flex flex-1 min-h-screen'>
				{/* LEFT — Illustration column */}
				<div className='hidden md:flex md:w-1/2 lg:w-[55%] items-end justify-start flex-shrink-0 overflow-hidden'>
					<img
						src={fr}
						alt='Marketing Illustration'
						className='w-full max-w-[680px] h-auto object-bottom self-end'
					/>
				</div>

				{/* RIGHT — Content column */}
				<div className='w-full md:w-1/2 lg:w-[45%] flex flex-col items-start justify-center px-8 md:px-12 lg:px-16 py-16'>
					{/* Title */}
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight'>
						Your{" "}
						<span className='text-orange-400'>free trial</span>
					</h1>

					{/* Description */}
					<p className='text-gray-600 text-base md:text-lg leading-relaxed mb-3 max-w-md'>
						Unlock your business growth with streamlined marketing
						and automation. Save time, boost engagement, and grow
						effortlessly.
					</p>

					{/* Trial Info */}
					<p className='text-gray-500 text-sm mb-8'>
						Try 14 days free trial, auto renews monthly.{" "}
						<span className='text-blue-600 underline cursor-pointer'>
							Cancel anytime
						</span>
					</p>

					{/* Display error if exists */}
					{error && (
						<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg w-full max-w-md'>
							{error}
						</div>
					)}

					{/* Email Pill Form */}
					<div className='w-full max-w-md'>
						<div className='w-full bg-white border border-gray-200 rounded-full shadow-sm p-1.5 pl-6 flex items-center focus-within:ring-2 focus-within:ring-blue-100 transition-all'>
							<input
								id='email'
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
								placeholder='Enter your email'
								className='flex-grow bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base h-full'
								required
							/>
							<Button
								onClick={handleRequest}
								disabled={loading}
								className='bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 font-medium transition-colors duration-300 shadow-md shadow-blue-600/20 whitespace-nowrap'
								title={loading ? "Sending..." : "Sign up"}
							/>
						</div>

						{/* Already have an account */}
						<div className='mt-5'>
							<p className='text-gray-600 text-sm'>
								Already have an account?{" "}
								<Link
									to='/login'
									className='text-blue-600 font-semibold hover:underline'
								>
									Login
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
