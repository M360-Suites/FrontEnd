import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useStore from "../../../state/store";
import { useNavigate } from "react-router-dom";

const SiteAudit = () => {
	const { seoData, analyzeDomain, isLoading } = useStore();
	const navigate = useNavigate();
	const [domain, setDomain] = useState(null);
	const [data, setData] = useState(null);

	// Get the most recent domain or first available
	useEffect(() => {
		const domains = Object.keys(seoData);
		if (domains.length > 0) {
			// Use the most recently added key or just the first one
			const currentDomain = domains[domains.length - 1];
			setDomain(currentDomain);
			setData(seoData[currentDomain]?.siteAudit);
		}
	}, [seoData]);

	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (data) {
			// Animate progress to score
			const timer = setTimeout(() => {
				setProgress(data.score || 0);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [data]);

	const handleReRun = async () => {
		if (domain) {
			await analyzeDomain(domain);
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const progressVariants = {
		hidden: { width: 0 },
		visible: {
			width: `${progress}%`,
			transition: { duration: 2, ease: "easeInOut" },
		},
	};

	if (!domain || !data) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Icon
					icon='mdi:magnify-scan'
					className='text-6xl text-gray-300 mb-4'
				/>
				<h2 className='text-xl font-bold text-gray-700 mb-2'>
					No Audit Data Found
				</h2>
				<p className='text-gray-500 mb-6'>
					Please analyze a domain in the SEO Dashboard first.
				</p>
				<button
					onClick={() => navigate("/seo-tools")}
					className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors'
				>
					Go to Dashboard
				</button>
			</div>
		);
	}

	const auditStats = [
		{
			name: "Pages Crawled",
			value: data.crawledPages,
			icon: "mdi:file-document-multiple-outline",
			color: "text-blue-500",
		},
		{
			name: "Errors",
			value: data.issues.errors,
			icon: "mdi:alert-circle",
			color: "text-red-500",
		},
		{
			name: "Warnings",
			value: data.issues.warnings,
			icon: "mdi:alert",
			color: "text-orange-500",
		},
		{
			name: "Notices",
			value: data.issues.notices,
			icon: "mdi:information",
			color: "text-blue-400",
		},
		{
			name: "LCP",
			value: data.coreWebVitals?.lcp || "N/A",
			icon: "mdi:timer-sand",
			color: "text-purple-500",
		},
		{
			name: "CLS",
			value: data.coreWebVitals?.cls || "N/A",
			icon: "mdi:view-quilt",
			color: "text-green-500",
		},
	];

	return (
		<motion.div
			className='p-4 sm:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 min-h-screen bg-gray-50'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Header */}
			<motion.div
				className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 lg:p-6 bg-white border border-gray-200 rounded-lg shadow-sm'
				variants={itemVariants}
			>
				<div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6'>
					<h1 className='text-xl lg:text-2xl font-bold text-gray-800'>
						Site Audit
					</h1>
					<span className='text-orange-500 font-medium text-sm lg:text-base'>
						{domain}
					</span>
				</div>

				<div className='flex gap-3 w-full sm:w-auto'>
					<motion.button
						onClick={handleReRun}
						disabled={isLoading}
						className={`bg-orange-500 hover:bg-orange-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg transition-colors flex-1 sm:flex-none ${
							isLoading ? "opacity-70 cursor-wait" : ""
						}`}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span className='flex items-center justify-center gap-2'>
							<Icon
								icon={isLoading ? "mdi:loading" : "mdi:refresh"}
								className={`text-lg ${
									isLoading ? "animate-spin" : ""
								}`}
							/>
							{isLoading ? "Running..." : "Re-Run"}
						</span>
					</motion.button>
				</div>
			</motion.div>

			{/* Progress Bar (Health Score) */}
			<motion.div variants={itemVariants}>
				<div className='flex justify-between mb-2'>
					<span className='font-semibold text-gray-700'>
						Health Score
					</span>
					<span className='font-bold text-orange-600'>
						{progress}/100
					</span>
				</div>
				<div className='w-full bg-gray-200 h-6 lg:h-8 rounded-full overflow-hidden shadow-inner'>
					<motion.div
						className={`h-full rounded-full flex items-center justify-end pr-4 ${
							progress > 80
								? "bg-green-500"
								: progress > 50
								? "bg-orange-500"
								: "bg-red-500"
						}`}
						variants={progressVariants}
						initial='hidden'
						animate='visible'
					/>
				</div>
			</motion.div>

			{/* Audit Results Grid */}
			<motion.div
				className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6'
				variants={itemVariants}
			>
				{auditStats.map((item, index) => (
					<motion.div
						key={item.name}
						className='bg-white p-4 lg:p-6 rounded-xl hover:shadow-lg transition-shadow border border-gray-100'
						variants={{
							hidden: { opacity: 0, scale: 0.9 },
							visible: {
								opacity: 1,
								scale: 1,
								transition: { delay: index * 0.1, duration: 0.5 },
							},
						}}
						whileHover={{ y: -5 }}
					>
						<div className='flex items-center gap-3 mb-3'>
							<Icon
								icon={item.icon}
								className={`text-2xl ${item.color}`}
							/>
							<span className='font-semibold text-sm text-gray-600'>
								{item.name}
							</span>
						</div>
						<hr className='mb-3 border-gray-100' />
						<motion.div
							className='text-2xl font-bold text-gray-900'
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								delay: 0.5 + index * 0.1,
								type: "spring",
								stiffness: 100,
							}}
						>
							{item.value}
						</motion.div>
					</motion.div>
				))}
			</motion.div>

			{/* Top Issues Section */}
			<motion.div
				className='flex flex-col lg:flex-row gap-6 lg:gap-8'
				variants={itemVariants}
			>
				{/* Issues List */}
				<motion.div
					className='flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'
					whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
				>
					<div className='p-6'>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-xl font-bold text-gray-800'>
								Top Issues Discovered
							</h2>
						</div>

						<div className='space-y-4'>
							{data.topIssues?.map((issue, index) => (
								<motion.div
									key={index}
									className='flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors'
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{ delay: 0.5 + index * 0.1 }}
								>
									<div className='flex items-center gap-3'>
										<Icon
											icon={
												issue.type === "Error"
													? "mdi:alert-circle"
													: issue.type === "Warning"
													? "mdi:alert"
													: "mdi:information"
											}
											className={`text-xl ${
												issue.type === "Error"
													? "text-red-500"
													: issue.type === "Warning"
													? "text-orange-500"
													: "text-blue-400"
											}`}
										/>
										<h3 className='font-medium text-gray-800 text-sm md:text-base'>
											{issue.message}
										</h3>
									</div>
									<div className='flex items-center gap-3'>
										<span
											className={`text-xs px-2 py-1 rounded-full font-medium ${
												issue.type === "Error"
													? "bg-red-100 text-red-700"
													: issue.type === "Warning"
													? "bg-orange-100 text-orange-700"
													: "bg-blue-100 text-blue-700"
											}`}
										>
											{issue.type}
										</span>
										<span className='font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm'>
											{issue.count}
										</span>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default SiteAudit;
