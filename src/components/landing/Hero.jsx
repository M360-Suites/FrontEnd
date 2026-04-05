import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Hero = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.2 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
	};

	return (
		<motion.div 
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className='relative flex flex-col xl:flex-row gap-10 p-8 pt-20 md:pt-32 xl:h-[850px] justify-center items-center bg-primary-orange text-white overflow-hidden rounded-bl-[90px] md:rounded-bl-[150px]'
		>
			{/* Abstract Background Shapes */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<motion.div 
					animate={{ rotate: 360 }} 
					transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
					className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-orange-gradient-radial blur-[120px] opacity-20" 
				/>
				<motion.div 
					animate={{ rotate: -360 }} 
					transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
					className="absolute top-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-orange-gradient-radial blur-[150px] opacity-30" 
				/>
			</div>

			{/* Text Content */}
			<div className='flex flex-col gap-8 z-10 w-full xl:w-5/12 text-center xl:text-left items-center xl:items-start'>
				<motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
					<span className="flex h-2 w-2 rounded-full bg-light-orange animate-pulse"></span>
					<span className="text-sm font-medium text-light-orange tracking-wide uppercase">Introducing Digital Marketing360</span>
				</motion.div>
				
				<motion.h1 variants={itemVariants} className='text-4xl md:text-6xl font-extrabold leading-tight tracking-tight'>
					Scale Your Business with <br className="hidden md:block"/>
					<span className='text-transparent bg-clip-text bg-gradient-to-r from-light-orange to-blue-400'>
						Next-Gen Automation
					</span>
				</motion.h1>
				
				<motion.p variants={itemVariants} className='text-base md:text-lg text-white/80 max-w-sm md:max-w-xl font-light leading-relaxed'>
					Stop juggling disconnected tools. Digital Marketing360 is your all-in-one command center for orchestrating email sequences, managing ad campaigns, and dominating social media.
				</motion.p>
				
				<motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
					<Link to={"/onboarding"}>
						<button className='w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-primary-orange px-8 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all group'>
							<span>Start Free Trial</span>
							<Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-1" />
						</button>
					</Link>
					<button className='w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border border-white/30 hover:bg-white/10 transition-all'>
						<Icon icon="lucide:play-circle" className="text-xl" />
						<span>See it in Action</span>
					</button>
				</motion.div>

				<motion.div variants={itemVariants} className="flex items-center gap-4 mt-6 text-sm text-white/60">
					<div className="flex -space-x-2">
						{[1,2,3,4].map(i => (
							<div key={i} className={`w-8 h-8 rounded-full border-2 border-primary-orange bg-gradient-to-br from-blue-${i*100} to-blue-400 flex items-center justify-center overflow-hidden`}>
								<img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
							</div>
						))}
					</div>
					<p>Trusted by 10,000+ marketing teams</p>
				</motion.div>
			</div>

			{/* Floating Dashboard Elements */}
			<motion.div variants={itemVariants} className='relative w-full xl:w-7/12 h-[400px] md:h-[600px] z-10 flex items-center justify-center mt-12 xl:mt-0'>
				{/* Main Dashboard Card */}
				<motion.div 
					animate={{ y: [0, -15, 0] }}
					transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
					className="absolute w-full max-w-[650px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl"
				>
					{/* Mock Header */}
					<div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-lg bg-gradient-to-r from-light-orange to-blue-500 flex items-center justify-center shadow-lg">
								<Icon icon="lucide:bar-chart-2" className="text-white text-xl" />
							</div>
							<div>
								<h3 className="font-semibold text-lg">Campaign Performance</h3>
								<p className="text-xs text-white/60">Updated just now</p>
							</div>
						</div>
						<div className="flex gap-2">
							<span className="px-3 py-1 bg-white/10 rounded-full text-xs">This Month</span>
						</div>
					</div>

					{/* Mock Metrics */}
					<div className="grid grid-cols-3 gap-4 mb-6">
						{[
							{ label: "Total Reach", value: "2.4M", icon: "lucide:users", trend: "+12.5%" },
							{ label: "Conversions", value: "84.2K", icon: "lucide:target", trend: "+8.2%" },
							{ label: "Revenue", value: "$1.2M", icon: "lucide:dollar-sign", trend: "+24.8%" }
						].map((stat, i) => (
							<div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
								<Icon icon={stat.icon} className="text-light-orange mb-2" />
								<p className="text-white/60 text-xs mb-1">{stat.label}</p>
								<div className="flex items-end gap-2">
									<h4 className="text-xl font-bold">{stat.value}</h4>
									<span className="text-green-400 text-xs font-medium">{stat.trend}</span>
								</div>
							</div>
						))}
					</div>

					{/* Mock Chart Area */}
					<div className="h-40 w-full bg-gradient-to-t from-white/10 to-transparent rounded-lg border border-white/5 relative overflow-hidden flex items-end">
						<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
							<path d="M0,100 Q10,70 20,80 T40,60 T60,80 T80,40 T100,50 L100,100 Z" fill="url(#gradient)" opacity="0.5" />
							<path d="M0,80 Q10,50 20,60 T40,40 T60,60 T80,20 T100,30" fill="none" stroke="#7cd2ff" strokeWidth="2" />
							<defs>
								<linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#7cd2ff" stopOpacity="0.8"/>
									<stop offset="100%" stopColor="#7cd2ff" stopOpacity="0"/>
								</linearGradient>
							</defs>
						</svg>
					</div>
				</motion.div>

				{/* Floating Element 1 - Notification */}
				<motion.div 
					animate={{ y: [0, 20, 0] }}
					transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
					className="absolute -right-4 md:-right-12 top-10 md:top-20 bg-white text-gray-800 rounded-xl p-4 shadow-2xl flex items-center gap-4 w-64 border border-gray-100"
				>
					<div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
						<Icon icon="lucide:check-circle-2" className="text-green-600 text-xl" />
					</div>
					<div>
						<p className="text-sm font-semibold">Campaign live</p>
						<p className="text-xs text-gray-500">"Q4 Launch" sent to 50k users</p>
					</div>
				</motion.div>

				{/* Floating Element 2 - SEO Score */}
				<motion.div 
					animate={{ y: [0, -25, 0] }}
					transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
					className="absolute -left-4 md:-left-16 bottom-10 md:bottom-20 bg-white text-gray-800 rounded-xl p-5 shadow-2xl w-48 border border-gray-100"
				>
					<div className="flex justify-between items-center mb-3">
						<p className="text-sm font-semibold">SEO Health</p>
						<Icon icon="lucide:arrow-up-right" className="text-green-500" />
					</div>
					<div className="flex items-center justify-center">
						<div className="relative w-24 h-24">
							<svg className="w-full h-full" viewBox="0 0 36 36">
								<path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
								<path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#03045e" strokeWidth="3" strokeDasharray="92, 100" />
							</svg>
							<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-primary-orange">
								92
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Hero;
