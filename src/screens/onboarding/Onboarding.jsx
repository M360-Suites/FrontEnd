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
		<div className='min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-blue-100 flex flex-col items-center justify-center p-4'>
			{/* Main Content Container */}
			<div className='z-10 w-full max-w-3xl text-center flex flex-col items-center'>
				{/* Title */}
				<h1 className='text-4xl md:text-6xl font-bold text-blue-900 mb-6'>
					Your{" "}
					<span className='text-orange-300'>free trial</span>{" "}
				</h1>

				{/* Description */}
				<p className='text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-2 leading-relaxed'>
					Unlock your business growth with streamline marketing and
					automation. Save time, boost engagement, and grow
					effortlessly
				</p>

				{/* Trial Info Link */}
				<p className='text-gray-500 text-sm mb-10'>
					Try 14 days free trial, auto renews monthly{" "}
					<span className='text-blue-600 underline cursor-pointer'>
						cancel anytime
					</span>
				</p>

				{/* Display error if exists */}
				{error && (
					<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg w-full max-w-md'>
						{error}
					</div>
				)}

				{/* Search/Email Pill Form */}
				<div className='w-full max-w-md relative'>
					<div className='w-full bg-white border border-gray-200 rounded-full shadow-sm p-1.5 pl-6 flex items-center focus-within:ring-2 focus-within:ring-blue-100 transition-all'>
						<input
							id='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							placeholder='Enter email'
							className='flex-grow bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-base h-full'
							required
						/>
						<Button
							onClick={handleRequest}
							disabled={loading}
							className='bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3 font-medium transition-colors duration-300 shadow-md shadow-blue-600/20'
							title={loading ? "Sending..." : "Sign up"}
						/>
					</div>

					{/* Already have an account link */}
					<div className='text-center mt-6'>
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

export default Onboarding;
