import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useStore from "../../../state/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const KeywordOverview = () => {
	const { seoData } = useStore();
	const navigate = useNavigate();
	const [domain, setDomain] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		const domains = Object.keys(seoData);
		if (domains.length > 0) {
			const currentDomain = domains[domains.length - 1];
			setDomain(currentDomain);
			setData(seoData[currentDomain]?.keywordOverview);
		}
	}, [seoData]);

	if (!domain || !data) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Icon
					icon='mdi:database-search'
					className='text-6xl text-gray-300 mb-4'
				/>
				<h2 className='text-xl font-bold text-gray-700 mb-2'>
					No Keyword Data Found
				</h2>
				<p className='text-gray-500 mb-6'>
					Please analyze a domain in the SEO Dashboard first.
				</p>
				<button
					onClick={() => navigate("/seo-tools")}
					className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
				>
					Go to Dashboard
				</button>
			</div>
		);
	}

	const getDifficultyColor = (kd) => {
		if (kd < 30) return "bg-green-100 text-green-700";
		if (kd < 50) return "bg-yellow-100 text-yellow-700";
		if (kd < 70) return "bg-orange-100 text-orange-700";
		return "bg-red-100 text-red-700";
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<motion.div
			className='p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex flex-col gap-6'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			{/* Header */}
			<div className='flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-xl border border-blue-100 shadow-sm'>
				<div>
					<h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
						<Icon icon='mdi:key-star' className='text-blue-600' />
						Keyword Overview
					</h1>
					<p className='text-gray-500 text-sm mt-1'>
						Ranking keywords for {domain}
					</p>
				</div>
				<div className='flex gap-4 mt-4 sm:mt-0'>
					<div className='text-center px-4 py-2 bg-blue-50 rounded-lg'>
						<div className='text-xs text-blue-600 font-medium'>
							Total Keywords
						</div>
						<div className='text-xl font-bold text-blue-800'>
							{data.totalKeywords.toLocaleString()}
						</div>
					</div>
				</div>
			</div>

			{/* Distribution Cards */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<motion.div
					variants={itemVariants}
					className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'
				>
					<div className='flex items-center gap-2 mb-2'>
						<Icon
							icon='mdi:trophy'
							className='text-yellow-500 text-xl'
						/>
						<h3 className='font-semibold text-gray-700'>
							Top 3 Rankings
						</h3>
					</div>
					<p className='text-2xl font-bold text-gray-900'>
						{data.distribution.top3}
					</p>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'
				>
					<div className='flex items-center gap-2 mb-2'>
						<Icon
							icon='mdi:format-list-numbered'
							className='text-blue-500 text-xl'
						/>
						<h3 className='font-semibold text-gray-700'>
							Top 10 Rankings
						</h3>
					</div>
					<p className='text-2xl font-bold text-gray-900'>
						{data.distribution.top10}
					</p>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm'
				>
					<div className='flex items-center gap-2 mb-2'>
						<Icon
							icon='mdi:chart-bar'
							className='text-purple-500 text-xl'
						/>
						<h3 className='font-semibold text-gray-700'>
							Top 100 Rankings
						</h3>
					</div>
					<p className='text-2xl font-bold text-gray-900'>
						{data.distribution.top100}
					</p>
				</motion.div>
			</div>

			{/* Keywords Table */}
			<motion.div
				variants={itemVariants}
				className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'
			>
				<div className='p-6 border-b border-gray-100 flex justify-between items-center'>
					<h2 className='text-lg font-bold text-gray-800'>
						Top Organic Keywords
					</h2>
					<button className='text-blue-600 text-sm font-medium hover:underline flex items-center gap-1'>
						Export <Icon icon='mdi:download' />
					</button>
				</div>
				<div className='overflow-x-auto'>
					<table className='w-full text-left border-collapse'>
						<thead>
							<tr className='bg-gray-50 text-gray-500 text-sm'>
								<th className='px-6 py-4 font-medium'>Keyword</th>
								<th className='px-6 py-4 font-medium'>Position</th>
								<th className='px-6 py-4 font-medium'>Volume</th>
								<th className='px-6 py-4 font-medium'>KD %</th>
								<th className='px-6 py-4 font-medium'>CPC (USD)</th>
								<th className='px-6 py-4 font-medium'>URL</th>
							</tr>
						</thead>
						<tbody className='text-gray-700 text-sm'>
							{data.topKeywords.map((kw, idx) => (
								<tr
									key={idx}
									className='border-b border-gray-50 hover:bg-gray-50/50 transition-colors'
								>
									<td className='px-6 py-4 font-medium text-gray-900'>
										{kw.keyword}
									</td>
									<td className='px-6 py-4'>{kw.position}</td>
									<td className='px-6 py-4'>
										{kw.volume.toLocaleString()}
									</td>
									<td className='px-6 py-4'>
										<span
											className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
												kw.difficulty
											)}`}
										>
											{kw.difficulty}
										</span>
									</td>
									<td className='px-6 py-4'>${kw.cpc}</td>
									<td className='px-6 py-4 text-blue-500 truncate max-w-[200px] hover:underline cursor-pointer'>
										{kw.url}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default KeywordOverview;
