import { Link } from "react-router-dom";
import { crr } from "../../assets/";
const Hero = () => {
	return (
		<div className='flex flex-col gap-5 p-8 md:h-[700px] justify-center items-center bg-primary-orange text-white rounded-bl-[90px] md:rounded-bl-[250px]'>
			<h1 className='text-center md:text-4xl text-xl font-semibold leading-tight'>
				All-in-One{" "}
				<span className='text-light-orange font-bold'>
					Marketing Automation
				</span>{" "}
				Suite to Grow Your Business
			</h1>
			<p className='text-center text-sm max-w-sm md:max-w-2xl'>
				Simplify your marketing with M360 Suite. Build websites,
				automate emails, schedule social content, manage communities,
				and more, all in one place.
			</p>
			<Link to={"/onboarding"}>
				<button className='bg-white text-primary-orange px-8 py-4 rounded-xl font-bold'>
					Start Free Trial
				</button>
			</Link>

			<div>
				<img
					className='object-cover'
					src={crr}
					alt='sample campaign'
					srcset=''
				/>
			</div>
		</div>
	);
};
export default Hero;
