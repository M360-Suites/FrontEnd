import Connect from "../../components/landing/Connect";
import Extras from "../../components/landing/Extras";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import CTA from "../../components/landing/CTA";

const LandingPage = () => {
	return (
		<div className='w-full overflow-x-hidden min-h-screen'>
			<Hero />
			<Connect />
			<Features />
			<Extras />
			<CTA />
		</div>
	);
};
export default LandingPage;
