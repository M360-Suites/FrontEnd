import { fr } from "../../assets/index";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
	return (
		<div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-white to-blue-50 flex items-center justify-center p-4'>
			{/* Login Card */}
			<div className='z-10 w-full max-w-lg bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 md:p-12 border border-blue-50/50'>
				<LoginForm />
			</div>

			{/* Illustration Bottom Left */}
			<div className='hidden lg:block absolute bottom-0 left-0 w-[40%] max-w-[550px] z-0 pointer-events-none'>
				<img
					className='w-full h-auto object-bottom opacity-90'
					src={fr}
					alt='Business Growth Illustration'
				/>
			</div>
		</div>
	);
};

export default Login;
