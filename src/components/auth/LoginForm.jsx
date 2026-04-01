import { useState } from "react";
import { Icon } from "@iconify/react";
import { Google} from "../../assets/index";
import mainLogo from "/dm360.png";
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
	const from = location.state?.from?.pathname || "/dashboard";

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
			const authToken = res.data.accessToken;
			const userData = res.data.user;

			if (authToken) {
				// Use AuthContext login method to set global state
				authLogin(userData, authToken);

				// Navigate to intended destination
				navigate(from, { replace: true });
			} else {
				setError(
					"No authentication token received. Please try again.",
				);
			}
		} catch (error) {
			setError(
				error.response?.data?.message ||
					"Login failed. Please try again.",
			);
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
			// const res = await googleAuth();
			// Handle Google auth response similar to regular login
		} catch (error) {
			setError("Google authentication failed. Please try again.");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='w-full'>
			<div className='flex justify-between items-center mb-10'>
				<h1 className='text-3xl font-bold text-blue-900'>Sign in</h1>
				<img
					src={mainLogo}
					alt='DM360'
					className='h-8 md:h-10 object-contain'
				/>
			</div>

			{error && (
				<div className='p-3 mb-6 border rounded-xl border-red-200 bg-red-50 text-red-700 text-sm'>
					{error}
				</div>
			)}

			{/* Email Input */}
			<div className='mb-6'>
				<label
					htmlFor='email'
					className='text-gray-700 font-semibold block mb-2 text-sm'
				>
					Email
				</label>
				<div className='border border-gray-200 rounded-2xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all'>
					<input
						suggested='email'
						autoComplete='email'
						id='email'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						placeholder='dm360support@gmail.com'
						className='w-full px-4 py-3.5 outline-none text-gray-700 placeholder-gray-400'
						required
						disabled={loading}
					/>
				</div>
			</div>

			{/* Password Input */}
			<div className='mb-2'>
				<label
					htmlFor='password'
					className='text-gray-700 font-semibold block mb-2 text-sm'
				>
					Create Password
				</label>
				<div className='relative border border-gray-200 rounded-2xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all'>
					<input
						id='password'
						autoComplete='current-password'
						name='password'
						type={showPassword ? "text" : "password"}
						value={formData.password}
						onChange={handleChange}
						placeholder='••••••••••••••••'
						className='w-full px-4 py-3.5 outline-none text-gray-700 placeholder-gray-400'
						required
						disabled={loading}
					/>
					<button
						type='button'
						className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
						onClick={() => setShowPassword(!showPassword)}
						disabled={loading}
					>
						<Icon
							icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
							width={22}
						/>
					</button>
				</div>
			</div>

			<div className='text-right mb-8'>
				<Link
					to='/forgot-password'
					className='text-gray-500 text-sm hover:text-blue-600 transition-colors'
				>
					Forget Password?
				</Link>
			</div>

			{/* Login Button */}
			<div className='mb-6'>
				<Button
					type='submit'
					disabled={loading}
					title={loading ? "Logging you in..." : "Sign In"}
					className={`w-full py-4 text-white font-semibold rounded-xl text-lg shadow-lg shadow-blue-600/20 transition-all ${
						loading
							? "bg-blue-400 cursor-not-allowed"
							: "bg-blue-600 hover:bg-blue-700"
					}`}
				/>
			</div>

			{/* OR Divider */}
			<div className='flex items-center mb-6'>
				<div className='flex-grow border-t border-gray-200'></div>
				<span className='mx-4 text-gray-500 text-sm'>Or</span>
				<div className='flex-grow border-t border-gray-200'></div>
			</div>

			{/* Google Button */}
			<button
				type='button'
				onClick={handleGoogleLogin}
				disabled={loading}
				className='w-full flex items-center justify-center gap-3 border border-gray-300 rounded-full py-3.5 hover:bg-gray-50 transition-colors mb-8'
			>
				<img src={Google} alt='Google' className='w-5 h-5' />
				<span className='text-gray-700 font-medium'>
					Continue with Google
				</span>
			</button>

			{/* Sign up link */}
			<div className='text-center'>
				<p className='text-gray-500 text-sm'>
					Don't have an account?{" "}
					<Link
						to='/'
						className='text-blue-600 font-semibold hover:underline'
					>
						Sign up
					</Link>
				</p>
			</div>
		</form>
	);
};

export default LoginForm;
