import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useStore from "../../../state/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DomainOverview = () => {
	const { seoData, analyzeDomain, isLoading } = useStore();
	const navigate = useNavigate();
	const [domain, setDomain] = useState(null);
	const [data, setData] = useState(null);

	// Get the most recent domain or first available
	useEffect(() => {
		const domains = Object.keys(seoData);
		if (domains.length > 0) {
			const currentDomain = domains[domains.length - 1];
			setDomain(currentDomain);
			setData(seoData[currentDomain]);
		}
	}, [seoData]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	const handleAnalyze = async (e) => {
		e.preventDefault();
		const url = e.target.search.value;
		if (url) {
			let d = url.replace(/(^\w+:|^)\/\//, "").split("/")[0];
			await analyzeDomain(d);
		}
	};

	if (!domain || !data) {
		return (
			<div className='p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center'>
				<div className='max-w-xl w-full text-center'>
					<Icon
						icon='mdi:web'
						className='text-6xl text-gray-300 mx-auto mb-4'
					/>
					<h1 className='text-2xl font-bold text-gray-800 mb-2'>
						Domain Overview
					</h1>
					<p className='text-gray-500 mb-8'>
						Enter a domain to get a complete performance snapshot
					</p>

					<form onSubmit={handleAnalyze} className='flex gap-2'>
						<input
							name='search'
							type='text'
							placeholder='example.com'
							className='flex-1 p-3 rounded-lg border border-gray-300 focus:border-orange-500 outline-none'
						/>
						<button
							disabled={isLoading}
							className='bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors'
						>
							{isLoading ? "Analyzing..." : "Analyze"}
						</button>
					</form>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			className='p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex flex-col gap-6'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			<div className='flex justify-between items-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
				<div>
					<h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
						<Icon icon='mdi:domain' className='text-orange-500' />
						Domain Overview
					</h1>
					<p className='text-gray-500 text-sm mt-1'>{domain}</p>
				</div>
				<div className='text-right'>
					<span className='text-sm text-gray-500'>
						Authority Score
					</span>
					<div className='text-3xl font-bold text-gray-900'>
						{data.backlinks?.authorityScore || 0}
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{/* Organic Search Stats */}
				<motion.div
					variants={itemVariants}
					className='bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow'
				>
					<h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
						<Icon icon='mdi:google' className='text-blue-500' />{" "}
						Organic Search
					</h3>
					<div className='space-y-4'>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Traffic</span>
							<span className='font-bold'>
								{data.organicSearch.traffic.toLocaleString()}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Keywords</span>
							<span className='font-bold'>
								{data.organicSearch.keywords.toLocaleString()}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Traffic Cost</span>
							<span className='font-bold'>
								${data.organicSearch.value.toLocaleString()}
							</span>
						</div>
					</div>
				</motion.div>

				{/* Paid Search Stats (Mock) */}
				<motion.div
					variants={itemVariants}
					className='bg-white p-6 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow'
				>
					<h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
						<Icon
							icon='mdi:cash-multiple'
							className='text-green-500'
						/>{" "}
						Paid Search
					</h3>
					<div className='space-y-4'>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Traffic</span>
							<span className='font-bold'>0</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Keywords</span>
							<span className='font-bold'>0</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Cost</span>
							<span className='font-bold'>$0</span>
						</div>
					</div>
					<p className='text-xs text-center text-gray-400 mt-4'>
						No paid data found for demo
					</p>
				</motion.div>

				{/* Backlinks Stats */}
				<motion.div
					variants={itemVariants}
					className='bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow'
				>
					<h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
						<Icon
							icon='mdi:link-variant'
							className='text-purple-500'
						/>{" "}
						Backlinks
					</h3>
					<div className='space-y-4'>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Backlinks</span>
							<span className='font-bold'>
								{data.backlinks.total.toLocaleString()}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Ref. Domains</span>
							<span className='font-bold'>
								{data.backlinks.referringDomains.toLocaleString()}
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='text-gray-600'>Toxic Links</span>
							<span className='font-bold text-red-500'>
								{data.backlinks.toxic}
							</span>
						</div>
					</div>
				</motion.div>
			</div>

			{/* SEO Issues Summary reusing map */}
			<motion.div
				variants={itemVariants}
				className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'
			>
				<h3 className='text-lg font-semibold text-gray-800 mb-4'>
					Site Health Issues
				</h3>
				<div className='flex gap-4 flex-wrap'>
					<span className='px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium flex items-center gap-2'>
						<Icon icon='mdi:alert-circle' />{" "}
						{data.siteAudit.issues.errors} Errors
					</span>
					<span className='px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium flex items-center gap-2'>
						<Icon icon='mdi:alert' /> {data.siteAudit.issues.warnings}{" "}
						Warnings
					</span>
					<span className='px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium flex items-center gap-2'>
						<Icon icon='mdi:information' />{" "}
						{data.siteAudit.issues.notices} Notices
					</span>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default DomainOverview;
