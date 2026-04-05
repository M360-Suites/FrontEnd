import { motion } from "framer-motion";
import { ss, s1, s2 } from "../../assets";
import { Icon } from "@iconify/react/dist/iconify.js";

const Extras = () => {
	const emailFeatures = [
		"Generate data for leads",
		"Send personalized email campaigns",
		"Track open rates and click-throughs",
		"Automate follow-up sequences"
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.15 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	return (
		<section className='px-4 md:px-12 lg:px-24 py-24 bg-white overflow-hidden'>
			<div className='max-w-7xl mx-auto'>
				
				{/* Section Header */}
				<motion.div 
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={containerVariants}
					className="text-center max-w-3xl mx-auto mb-20"
				>
					<motion.h2 variants={itemVariants} className='text-3xl md:text-5xl font-bold text-primary-orange mb-6'>
						Everything You Need to Automate and <span className="text-light-orange">Scale Your Marketing</span>
					</motion.h2>
					<motion.p variants={itemVariants} className="text-lg text-gray-600">
						Stop paying for a dozen different tools. Digital Marketing360 brings your entire marketing stack under one powerful, unified dashboard.
					</motion.p>
				</motion.div>

				{/* Feature Block 1: Email Marketing */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32'>
					{/* Text Section */}
					<motion.div 
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={containerVariants}
						className='flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1'
					>
						<div>
							<motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-6 font-medium">
								<Icon icon="lucide:mail" className="text-lg" />
								<span>Intelligent Campaigns</span>
							</motion.div>
							<motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Email Marketing on Autopilot
							</motion.h3>
							<motion.p variants={itemVariants} className="text-gray-600 text-lg leading-relaxed">
								Craft beautiful emails, automate sequences based on user behavior, and watch your conversions soar with advanced real-time analytics.
							</motion.p>
						</div>

						<motion.div variants={containerVariants} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							{emailFeatures.map((item, i) => (
								<motion.div key={i} variants={itemVariants} className='flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100'>
									<div className='rounded-full bg-light-orange/20 flex items-center justify-center p-1 shrink-0 mt-0.5'>
										<Icon
											icon='mingcute:check-fill'
											className='h-4 w-4 text-primary-orange'
										/>
									</div>
									<span className='text-sm md:text-base text-gray-700 font-medium'>
										{item}
									</span>
								</motion.div>
							))}
						</motion.div>
						
						<motion.div variants={itemVariants}>
							<button className="flex items-center gap-2 text-primary-orange font-bold hover:text-light-orange transition-colors group">
								Explore Email Tools
								<Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-1" />
							</button>
						</motion.div>
					</motion.div>

					{/* Image Section */}
					<motion.div 
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8 }}
						className='relative flex items-center justify-center order-1 lg:order-2 h-[400px] md:h-[500px]'
					>
						<div className="absolute inset-0 bg-blue-50 rounded-full blur-[100px] opacity-70"></div>
						
						<motion.img
							animate={{ y: [0, -10, 0] }}
							transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
							src={ss}
							alt='dashboard preview'
							className='relative z-10 w-full max-w-[500px] object-cover rounded-2xl shadow-2xl border border-gray-200'
						/>
						
						{/* Floating elements */}
						<motion.div 
							animate={{ y: [0, 15, 0] }}
							transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
							className='absolute top-10 left-2 md:-left-12 bg-white p-3 rounded-xl shadow-xl border border-gray-100 z-20'
						>
							<img src={s2} alt='stat 1' className='w-16 md:w-32 object-contain' />
						</motion.div>
						
						<motion.div 
							animate={{ y: [0, -20, 0] }}
							transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
							className='absolute bottom-10 right-2 md:-right-8 bg-white p-3 rounded-xl shadow-xl border border-gray-100 z-20'
						>
							<img src={s1} alt='stat 2' className='w-16 md:w-32 object-contain' />
						</motion.div>
					</motion.div>
				</div>

				{/* Feature Block 2: Design Studio (Canvas-like) */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32'>
					{/* Text Section (Right) */}
					<motion.div 
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={containerVariants}
						className='flex flex-col gap-8 text-center lg:text-left order-2 lg:order-2'
					>
						<div>
							<motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 mb-6 font-medium">
								<Icon icon="lucide:palette" className="text-lg" />
								<span>Built-in Design Studio</span>
							</motion.div>
							<motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Create Like a Pro
							</motion.h3>
							<motion.p variants={itemVariants} className="text-gray-600 text-lg leading-relaxed">
								Ditch external subscriptions. Use our intuitive drag-and-drop workspace to design stunning social posts, banner ads, and marketing collateral instantly with thousands of templates.
							</motion.p>
						</div>

						<motion.div variants={containerVariants} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							{["Thousands of premium templates", "Brand kit integration", "One-click resize for all networks", "Team collaboration"].map((item, i) => (
								<motion.div key={i} variants={itemVariants} className='flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100'>
									<div className='rounded-full bg-indigo-100 flex items-center justify-center p-1 shrink-0 mt-0.5'>
										<Icon icon='mingcute:check-fill' className='h-4 w-4 text-indigo-600' />
									</div>
									<span className='text-sm md:text-base text-gray-700 font-medium'>
										{item}
									</span>
								</motion.div>
							))}
						</motion.div>
					</motion.div>

					{/* Image Section (Left - Mock Canvas) */}
					<motion.div 
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8 }}
						className='relative flex items-center justify-center order-1 lg:order-1 h-[400px] md:h-[500px]'
					>
						<div className="absolute inset-0 bg-indigo-50 rounded-full blur-[100px] opacity-70"></div>
						
						{/* Mock Canvas built with Tailwind */}
						<div className="relative z-10 w-full max-w-[500px] h-[350px] bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden flex flex-col">
							{/* Toolbar */}
							<div className="h-12 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-4">
								<div className="flex gap-2">
									<div className="w-3 h-3 rounded-full bg-red-400"></div>
									<div className="w-3 h-3 rounded-full bg-yellow-400"></div>
									<div className="w-3 h-3 rounded-full bg-green-400"></div>
								</div>
								<div className="flex gap-3 text-gray-400 ml-4">
									<Icon icon="lucide:undo" className="hover:text-indigo-600 transition-colors" />
									<Icon icon="lucide:redo" className="hover:text-indigo-600 transition-colors" />
									<Icon icon="lucide:type" className="hover:text-indigo-600 transition-colors" />
									<Icon icon="lucide:image" className="hover:text-indigo-600 transition-colors" />
								</div>
								<div className="ml-auto button bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium inline-flex items-center gap-1">
									<Icon icon="lucide:download" /> Export
								</div>
							</div>
							
							{/* Canvas Area */}
							<div className="flex-1 bg-gray-100 flex items-center justify-center p-6 relative">
								<motion.div 
									animate={{ scale: [0.95, 1, 0.95] }}
									transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
									className="w-full h-full bg-white shadow-md border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group"
								>
									{/* Active Element Box */}
									<div className="absolute inset-2 border-2 border-dashed border-indigo-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex justify-between">
										<div className="w-2 h-2 bg-indigo-600 -ml-1 -mt-1 rounded-sm"></div>
										<div className="w-2 h-2 bg-indigo-600 -mr-1 -mt-1 rounded-sm"></div>
									</div>

									<div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 shadow-lg mb-4 flex items-center justify-center text-white">
										<Icon icon="lucide:zap" className="text-2xl" />
									</div>
									<h4 className="text-xl font-black text-gray-800">SUMMER SALE</h4>
									<p className="text-sm font-bold text-indigo-600 tracking-widest mt-1">50% OFF EVERYTHING</p>
								</motion.div>
							</div>
						</div>

						{/* Floating Tool Palettes */}
						<motion.div 
							animate={{ y: [0, -15, 0] }}
							transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
							className='absolute top-20 hidden sm:flex flex-col gap-3 left-2 md:-left-10 bg-white px-2 py-3 rounded-xl shadow-xl border border-gray-100 z-20'
						>
							<div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center"><Icon icon="lucide:mouse-pointer-2" /></div>
							<div className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-50 flex items-center justify-center"><Icon icon="lucide:crop" /></div>
							<div className="w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-50 flex items-center justify-center"><Icon icon="lucide:layers" /></div>
						</motion.div>

					</motion.div>
				</div>

				{/* Feature Block 3: Ads & Social Listening */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-10'>
					{/* Text Section (Left) */}
					<motion.div 
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={containerVariants}
						className='flex flex-col gap-8 text-center lg:text-left order-2 lg:order-1'
					>
						<div>
							<motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 mb-6 font-medium">
								<Icon icon="lucide:megaphone" className="text-lg" />
								<span>Omnichannel Presence</span>
							</motion.div>
							<motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Master Your Audience
							</motion.h3>
							<motion.p variants={itemVariants} className="text-gray-600 text-lg leading-relaxed">
								Use robust social listening to track brand sentiment on autopilot, then deploy hyper-targeted campaigns across the web using our unified Ads Manager.
							</motion.p>
						</div>

						<motion.div variants={containerVariants} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							{["Real-time sentiment analysis", "Google & Meta Ad sync", "Automated ROAS tracking", "Cross-platform scheduling"].map((item, i) => (
								<motion.div key={i} variants={itemVariants} className='flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100'>
									<div className='rounded-full bg-green-100 flex items-center justify-center p-1 shrink-0 mt-0.5'>
										<Icon icon='mingcute:check-fill' className='h-4 w-4 text-green-600' />
									</div>
									<span className='text-sm md:text-base text-gray-700 font-medium'>
										{item}
									</span>
								</motion.div>
							))}
						</motion.div>
						
					</motion.div>

					{/* Image Section (Right - Mock Feed & Chart) */}
					<motion.div 
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8 }}
						className='relative flex items-center justify-center order-1 lg:order-2 h-[400px] md:h-[500px]'
					>
						<div className="absolute inset-0 bg-green-50 rounded-full blur-[100px] opacity-70"></div>
						
						{/* Main Ad Analytics Card */}
						<div className="relative z-10 w-full max-w-[450px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col gap-4">
							<div className="flex justify-between items-center mb-2">
								<h4 className="font-bold text-gray-800">Ads Performance</h4>
								<span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full font-bold inline-flex items-center gap-1"><Icon icon="lucide:trending-up" />+34%</span>
							</div>
							
							<div className="grid grid-cols-2 gap-4">
								<div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
									<p className="text-xs text-gray-500 mb-1">Total Spend</p>
									<p className="text-lg font-black text-gray-800">$4,250</p>
								</div>
								<div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
									<p className="text-xs text-gray-500 mb-1">Avg CPC</p>
									<p className="text-lg font-black text-gray-800">$0.45</p>
								</div>
							</div>

							<div className="h-32 mt-2 w-full flex items-end gap-2">
								{[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
									<motion.div 
										key={i} 
										initial={{ height: 0 }}
										whileInView={{ height: `${h}%` }}
										transition={{ duration: 0.5, delay: i * 0.1 }}
										className={`w-full rounded-t-sm ${i === 6 ? 'bg-primary-orange' : 'bg-gray-200'}`}
									></motion.div>
								))}
							</div>
						</div>

						{/* Floating Social Listening Alert */}
						<motion.div 
							animate={{ y: [0, 20, 0] }}
							transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
							className='absolute top-10 hidden md:block -right-10 bg-white p-4 rounded-xl shadow-2xl border border-gray-100 z-20 w-64'
						>
							<div className="flex items-center gap-3 mb-2">
								<div className="text-blue-500 bg-blue-50 rounded-full p-2"><Icon icon="lucide:twitter" /></div>
								<p className="font-bold text-sm text-gray-800">Brand Mention</p>
							</div>
							<p className="text-xs text-gray-600 line-clamp-2 italic mb-2">"Just switched our entire team to @M360Suite and the ROI is literally insane 🔥"</p>
							<div className="flex gap-2">
								<span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Positive</span>
								<span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Reach: 154k</span>
							</div>
						</motion.div>

					</motion.div>
				</div>

				{/* Feature Block 4: SEO & Social Analytics */}
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
					{/* Text Section (Right) */}
					<motion.div 
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={containerVariants}
						className='flex flex-col gap-8 text-center lg:text-left order-2 lg:order-2'
					>
						<div>
							<motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-600 mb-6 font-medium">
								<Icon icon="lucide:line-chart" className="text-lg" />
								<span>Actionable Intelligence</span>
							</motion.div>
							<motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
								Metrics That Matter
							</motion.h3>
							<motion.p variants={itemVariants} className="text-gray-600 text-lg leading-relaxed">
								Make data-driven traffic decisions. Our deep SEO and Social analytics provide you with everything from domain backlinks and ranking audits to follower demographics and engagement rates.
							</motion.p>
						</div>

						<motion.div variants={containerVariants} className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							{["Keyword rank tracking", "Site health audits", "Follower growth analytics", "Post engagement metrics"].map((item, i) => (
								<motion.div key={i} variants={itemVariants} className='flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100'>
									<div className='rounded-full bg-cyan-100 flex items-center justify-center p-1 shrink-0 mt-0.5'>
										<Icon icon='mingcute:check-fill' className='h-4 w-4 text-cyan-600' />
									</div>
									<span className='text-sm md:text-base text-gray-700 font-medium'>
										{item}
									</span>
								</motion.div>
							))}
						</motion.div>
					</motion.div>

					{/* Image Section (Left - Mock Analytics Dashboard) */}
					<motion.div 
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.8 }}
						className='relative flex items-center justify-center order-1 lg:order-1 h-[400px] md:h-[500px]'
					>
						<div className="absolute inset-0 bg-cyan-50 rounded-full blur-[100px] opacity-70"></div>
						
						{/* Mock Analytics UI */}
						<div className="relative z-10 w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
							{/* Header */}
							<div className="flex justify-between items-center mb-6">
								<div>
									<h4 className="font-bold text-gray-800 text-lg">Traffic Overview</h4>
									<p className="text-xs text-gray-500">Last 30 days combined</p>
								</div>
								<div className="flex gap-1">
									<div className="w-8 h-8 rounded-full bg-primary-orange flex items-center justify-center text-white"><Icon icon="lucide:search" className="text-sm" /></div>
									<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><Icon icon="lucide:facebook" className="text-sm" /></div>
								</div>
							</div>

							{/* Stats Row */}
							<div className="flex gap-4 mb-6">
								<div className="flex-1 bg-cyan-50 rounded-xl p-4">
									<Icon icon="lucide:globe" className="text-cyan-600 mb-2" />
									<p className="text-2xl font-black text-gray-800">124K</p>
									<p className="text-xs font-semibold text-cyan-700">Organic Visitors</p>
								</div>
								<div className="flex-1 bg-purple-50 rounded-xl p-4">
									<Icon icon="lucide:users" className="text-purple-600 mb-2" />
									<p className="text-2xl font-black text-gray-800">42K</p>
									<p className="text-xs font-semibold text-purple-700">Social Reach</p>
								</div>
							</div>

							{/* Mock Line Chart */}
							<div className="h-32 w-full relative">
								<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
									<path d="M0,100 L0,60 Q10,40 20,50 T40,30 T60,40 T80,20 T100,25 L100,100 Z" fill="#e0f2fe" opacity="0.6" />
									<path d="M0,60 Q10,40 20,50 T40,30 T60,40 T80,20 T100,25" fill="none" stroke="#0ea5e9" strokeWidth="3" />
									
									<path d="M0,100 L0,80 Q10,70 20,75 T40,60 T60,65 T80,50 T100,45 L100,100 Z" fill="#f3e8ff" opacity="0.6" />
									<path d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,50 T100,45" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="4,4" />
								</svg>
							</div>
						</div>

						{/* Floating Keyword Ranking Card */}
						<motion.div 
							animate={{ y: [0, -15, 0] }}
							transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
							className='absolute top-6 left-2 md:-left-12 bg-white px-2 py-2 md:px-4 md:py-3 rounded-xl shadow-xl border border-gray-100 z-20 flex items-center gap-2 md:gap-4'
						>
							<div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs md:text-base">#1</div>
							<div>
								<p className="font-bold text-xs md:text-sm text-gray-800 truncate leading-tight">"Marketing Tools"</p>
								<p className="text-[10px] md:text-xs text-gray-500">Vol: 45k/mo</p>
							</div>
						</motion.div>

						{/* Floating Metric Card */}
						<motion.div 
							animate={{ y: [0, 15, 0] }}
							transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
							className='absolute bottom-10 right-2 md:-right-8 bg-white p-2 md:p-3 rounded-xl shadow-xl border border-gray-100 z-20 flex items-center gap-2 md:gap-3'
						>
							<div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-cyan-500 border-l-gray-100 flex items-center justify-center"><Icon icon="lucide:arrow-up" className="text-cyan-500 text-[10px] md:text-xs" /></div>
							<div>
								<p className="text-[10px] md:text-xs text-gray-500">DA Score</p>
								<p className="font-bold text-gray-800 text-sm md:text-lg">76<span className="text-[8px] md:text-xs text-gray-400 font-normal">/100</span></p>
							</div>
						</motion.div>

					</motion.div>
				</div>

			</div>
		</section>
	);
};

export default Extras;
