import { useState, useEffect } from "react";
import { signUp } from "../../functions/authFunctions";
import Button from "../../components/ui/Button";
import { nuth } from "../../assets";
import { Icon } from "@iconify/react";
import { getCookie, removeCookie } from "../../utils/cookies";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		companyName: "",
		email: "",
		companyUrl: "",
		password: "",
		confirmPassword: "",
	});
	const [isOrg, setIsOrg] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState(false);
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
				"No verification token found, redirecting to verification",
			);
			navigate("/verify");
		}
	}, [navigate]);

	const handleToggleOrg = (isOrgValue) => {
		setIsOrg(isOrgValue);
		setFormData((prev) => ({
			...prev,
			fullName: isOrgValue ? "" : prev.fullName,
			companyName: !isOrgValue ? "" : prev.companyName,
			companyUrl: !isOrgValue ? "" : prev.companyUrl,
		}));
		// Clear specific errors related to organization/personal when switching
		setErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors.fullName;
			delete newErrors.companyName;
			delete newErrors.companyUrl;
			return newErrors;
		});
	};

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

		if (isOrg) {
			if (!formData.companyName.trim()) {
				newErrors.companyName = "Company name is required";
			}
			if (!formData.companyUrl.trim()) {
				newErrors.companyUrl = "Company URL is required";
			}
		} else {
			if (!formData.fullName?.trim()) {
				newErrors.fullName = "Full name is required";
			}
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Please enter a valid email";
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
				name: isOrg ? formData.companyName : formData.fullName,
				org: isOrg,
				email: formData.email,
				token: verificationToken,
				url: isOrg ? formData.companyUrl : undefined,
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
				setErrors({
					submit: "Registration failed. Please try again.",
				});
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
		<div className='flex flex-col md:flex-row min-h-screen items-center justify-center p-4 bg-gradient-to-br from-white to-blue-50'>
			{/* Left Side - Illustration and Text */}
			<div className='hidden md:flex flex-col w-1/2 max-w-2xl px-8'>
				<div className='mb-8'>
					<h1 className='text-4xl lg:text-5xl font-bold text-blue-900 mb-4'>
						Create an <br />
						{isOrg ? "organization" : "personal"} account
					</h1>
					<p className='text-gray-600 text-lg'>
						{isOrg 
							? "Organization account allows you to collaborate with your team on a project"
							: "Personal account allows you to manage your own projects and tasks"}
					</p>
				</div>
				<div className='relative w-full aspect-square max-w-lg'>
					<img
						src={nuth}
						alt='Registration Illustration'
						className='object-contain w-full h-full'
					/>
				</div>
			</div>

			{/* Right Side - Form */}
			<div className='w-full md:w-1/2 max-w-md pl-0 md:pl-16'>
				<form onSubmit={handleSubmit} className='space-y-5'>
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

					{/* Account Type Toggle */}
					<div className="flex bg-gray-100 p-1 rounded-xl mb-6">
						<button
							type="button"
							onClick={() => handleToggleOrg(true)}
							className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${isOrg ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
						>
							Organization
						</button>
						<button
							type="button"
							onClick={() => handleToggleOrg(false)}
							className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!isOrg ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
						>
							Personal
						</button>
					</div>

					{/* Dynamic Fields */}
					{isOrg ? (
						<>
							{/* Company Name */}
							<div>
								<label
									htmlFor='companyName'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Company's name
								</label>
								<div
									className={`w-full border rounded-2xl overflow-hidden transition-all duration-300 ${
										errors.companyName
											? "border-red-300"
											: "border-gray-200"
									}`}
								>
									<input
										id='companyName'
										name='companyName'
										type='text'
										placeholder='Enter your company name'
										className='w-full px-4 py-3.5 outline-none text-gray-700 placeholder-gray-400'
										required={isOrg}
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

							{/* Company URL */}
							<div>
								<label
									htmlFor='companyUrl'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Company's URL
								</label>
								<div
									className={`w-full border rounded-2xl overflow-hidden transition-all duration-300 ${
										errors.companyUrl
											? "border-red-300"
											: "border-gray-200"
									}`}
								>
									<input
										id='companyUrl'
										autoComplete='off'
										name='companyUrl'
										type='text'
										placeholder='www.website.com'
										className='w-full px-4 py-3.5 outline-none text-gray-700 placeholder-gray-400'
										required={isOrg}
										value={formData.companyUrl}
										onChange={handleChange}
									/>
								</div>
								{errors.companyUrl && (
									<p className='text-xs text-red-500 mt-1'>
										{errors.companyUrl}
									</p>
								)}
							</div>
						</>
					) : (
						<>
							{/* Full Name */}
							<div>
								<label
									htmlFor='fullName'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Full Name
								</label>
								<div
									className={`w-full border rounded-2xl overflow-hidden transition-all duration-300 ${
										errors.fullName
											? "border-red-300"
											: "border-gray-200"
									}`}
								>
									<input
										id='fullName'
										name='fullName'
										type='text'
										placeholder='Enter your full name'
										className='w-full px-4 py-3.5 outline-none text-gray-700 placeholder-gray-400'
										required={!isOrg}
										value={formData.fullName}
										onChange={handleChange}
									/>
								</div>
								{errors.fullName && (
									<p className='text-xs text-red-500 mt-1'>
										{errors.fullName}
									</p>
								)}
							</div>
						</>
					)}

					{/* Email - Keeping it hidden or present? The screenshot doesn't explicitly show Email, just Company, URL, Password. 
               But the logic requires Email. I will keep it but maybe it's populated from onboarding?
               Wait, "From the register to onboarding".
               If the user comes from Email Verification, they have an email.
               In the code: `formData.email`.
               Screenshot `uploaded_media_0` shows: Company's name, Company's URL, Create Password.
               It does NOT show Email.
               However, `Register.jsx` logic requires `email`.
               Is it possible 'email' is passed silently or inferred?
               Or maybe I should leave it?
               If I remove it from UI, the form won't submit or needs a hidden input.
               `verificationToken` is used. Maybe the backend knows the email from token?
               But the logic sends `email` in `signUp`.
               The Register form in screenshot seems to be "Create an organization account".
               I'll keep the email field for safety but maybe assume the screenshot omitted it or I should check if it's auto-filled/hidden.
               Use case: User verifies email -> Redirects to Register. The email should be known?
               Code line 27: `getCookie("verificationToken")`.
               If I look at `EmailVerification.jsx`, it says `setTimeout(() => navigate("/register"), 1500);` after verify.
               Does it save email to cookie? `Onboarding` saves `verificationEmail`. `EmailVerification` uses it.
               The `signUp` function takes `email`.
               I will keep the email input but maybe put it above or below, or if the screenshot strictly excludes it, maybe it's pre-filled and readonly?
               I'll keep it for now as sticking to the screenshot 100% might break functionality if the backend needs manual entry, but visual accuracy suggests it might not be there.
               Actually, checking the screenshot again `uploaded_media_0`:
               "Company's name", "Company's URL", "Create Password", "Create account".
               There is NO email field.
               I'll hide the email field if `email` is supposed to be carried over, but currently `formData.email` is empty init.
               I'll leave it in but maybe visually similar to the others?
               Or maybe the user forgot to scroll or the screenshot is partial.
               I will include it because I cannot change backend logic without more info.
               I'll style it consistently.
           */}
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-semibold text-gray-700 mb-2'
						>
							Email Address
						</label>
						<div
							className={`w-full border rounded-2xl overflow-hidden transition-all duration-300 ${
								errors.email ? "border-red-300" : "border-gray-200"
							}`}
						>
							<input
								id='email'
								name='email'
								type='email'
								placeholder='Enter Your Email'
								className='w-full px-4 py-3.5 outline-none text-gray-700 placeholder-gray-400'
								required
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						{errors.email && (
							<p className='text-xs text-red-500 mt-1'>
								{errors.email}
							</p>
						)}
					</div>

					{/* Password */}
					<div>
						<label
							htmlFor='password'
							className='block text-sm font-semibold text-gray-700 mb-2'
						>
							Create Password
						</label>
						<div
							className={`w-full border rounded-2xl overflow-hidden transition-all duration-300 ${
								errors.password ? "border-red-300" : "border-gray-200"
							}`}
						>
							<div className='flex items-center'>
								<input
									id='password'
									autoComplete='new-password'
									name='password'
									type={showPassword ? "text" : "password"}
									placeholder='••••••••••••••••'
									className='w-full px-4 py-3.5 outline-none text-gray-700 placeholder-gray-400'
									required
									value={formData.password}
									onChange={handleChange}
									minLength={8}
								/>
								<button
									type='button'
									className='pr-4 text-gray-400 hover:text-gray-600'
									onClick={togglePasswordVisibility}
								>
									<Icon
										icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
										className='h-5 w-5'
									/>
								</button>
							</div>
						</div>
						{errors.password && (
							<p className='text-xs text-red-500 mt-1'>
								{errors.password}
							</p>
						)}
					</div>

					{/* Confirm Password - Screenshot doesn't show it but good practice. I'll keep it. */}
					<div>
						<label
							htmlFor='confirmPassword'
							className='block text-sm font-semibold text-gray-700 mb-2'
						>
							Confirm Password
						</label>
						<div
							className={`w-full border rounded-2xl overflow-hidden transition-all duration-300 ${
								errors.confirmPassword
									? "border-red-300"
									: "border-gray-200"
							}`}
						>
							<div className='flex items-center'>
								<input
									id='confirmPassword'
									autoComplete='new-password'
									name='confirmPassword'
									type={showConfirmPassword ? "text" : "password"}
									placeholder='••••••••••••••••'
									className='w-full px-4 py-3.5 outline-none text-gray-700 placeholder-gray-400'
									required
									value={formData.confirmPassword}
									onChange={handleChange}
								/>
								<button
									type='button'
									className='pr-4 text-gray-400 hover:text-gray-600'
									onClick={toggleConfirmPasswordVisibility}
								>
									<Icon
										icon={
											showConfirmPassword ? "mdi:eye-off" : "mdi:eye"
										}
										className='h-5 w-5'
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

					{/* Create Account Button */}
					<div className='pt-2'>
						<Button
							type='submit'
							className={`w-full py-4 rounded-full text-white font-medium text-lg transition-all duration-300 shadow-lg shadow-blue-500/30 ${
								isLoading
									? "bg-blue-400 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							}`}
							title={
								isLoading ? "Creating account..." : "Create account"
							}
							disabled={isLoading}
						/>
					</div>

					{/* Terms and Conditions */}
					<div className='flex items-center mt-4'>
						<div className='flex items-center h-5'>
							<input
								id='terms'
								name='terms'
								type='checkbox'
								className={`w-5 h-5 border-2 border-gray-300 rounded focus:ring-blue-500 text-blue-600 transition-colors cursor-pointer ${
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
							<label
								htmlFor='terms'
								className='text-gray-600 font-medium'
							>
								By signing up, I agree to{" "}
								<Link
									to='/terms'
									className='text-gray-800 font-bold hover:underline'
									target='_blank'
									rel='noopener noreferrer'
								>
									Terms and Condition
								</Link>
							</label>
							{errors.terms && (
								<p className='text-xs text-red-500 mt-1'>
									{errors.terms}
								</p>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
