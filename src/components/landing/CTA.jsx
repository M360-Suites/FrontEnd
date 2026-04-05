import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const CTA = () => {
	return (
		<section className="relative py-24 overflow-hidden bg-primary-orange">
			{/* Background Elements */}
			<div className="absolute inset-0 z-0">
				<div className="absolute top-0 left-0 w-full h-full bg-orange-gradient-vertical opacity-50 mix-blend-multiply"></div>
				<motion.div 
					animate={{ rotate: 360 }}
					transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
					className="absolute -top-[50%] -right-[20%] w-[100%] h-[150%] rounded-full bg-light-orange blur-[150px] opacity-20"
				></motion.div>
			</div>

			<div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
						Ready to Transform Your Marketing?
					</h2>
					<p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
						Join thousands of businesses who have scaled their operations using Digital Marketing360. Start your free trial today.
					</p>

					<div className="flex flex-col sm:flex-row justify-center items-center gap-4">
						<Link to="/onboarding">
							<button className="px-8 py-4 bg-white text-primary-orange rounded-xl font-bold hover:scale-105 hover:bg-light-orange hover:text-white transition-all shadow-xl flex items-center gap-2 group w-full sm:w-auto justify-center">
								<span>Get Started for Free</span>
								<Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-1" />
							</button>
						</Link>
						<button className="px-8 py-4 bg-transparent border border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
							<span>Schedule Demo</span>
						</button>
					</div>
					
					<p className="mt-8 text-sm text-white/60">No credit card required. 14-day free trial.</p>
				</motion.div>
			</div>
		</section>
	);
};

export default CTA;
