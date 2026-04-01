import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useStore from "../../../state/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BacklinkAnalytic = () => {
	const { seoData } = useStore();
	const navigate = useNavigate();
	const [domain, setDomain] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		const domains = Object.keys(seoData);
		if (domains.length > 0) {
			const currentDomain = domains[domains.length - 1];
			setDomain(currentDomain);
			setData(seoData[currentDomain]?.backlinks); // Main backlinks stats
		}
	}, [seoData]);

	// We need the profile detail too
	const [profileData, setProfileData] = useState(null);
	useEffect(() => {
		if (domain) {
			setProfileData(seoData[domain]?.backlinkProfile);
		}
	}, [domain, seoData]);

	if (!domain || !data || !profileData) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Icon
					icon='mdi:link-variant-off'
					className='text-6xl text-gray-300 mb-4'
				/>
				<h2 className='text-xl font-bold text-gray-700 mb-2'>
					No Backlink Data Found
				</h2>
				<p className='text-gray-500 mb-6'>
					Please analyze a domain in the SEO Dashboard first.
				</p>
				<button
					onClick={() => navigate("/seo-tools")}
					className='bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors'
				>
					Go to Dashboard
				</button>
			</div>
		);
	}

	const anchorChartData = {
		labels: profileData.anchors.map((a) => a.text),
		datasets: [
			{
				data: profileData.anchors.map((a) => a.percent),
				backgroundColor: [
					"#8b5cf6",
					"#a78bfa",
					"#c4b5fd",
					"#ddd6fe",
					"#ede9fe",
				],
				borderWidth: 1,
			},
		],
	};

	const followChartData = {
		labels: ["Follow", "Nofollow", "Sponsored", "UGC"],
		datasets: [
			{
				data: [
					profileData.attributes.follow,
					profileData.attributes.nofollow,
					profileData.attributes.sponsored,
					profileData.attributes.ugc,
				],
				backgroundColor: ["#10b981", "#6b7280", "#f59e0b", "#3b82f6"],
				borderWidth: 0,
			},
		],
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
			<div className='flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-xl border border-purple-100 shadow-sm'>
				<div>
					<h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
						<Icon
							icon='mdi:chart-timeline'
							className='text-purple-600'
						/>
						Backlink Analytics
					</h1>
					<p className='text-gray-500 text-sm mt-1'>
						Historical link data for {domain}
					</p>
				</div>
				<div className='flex gap-4 mt-4 sm:mt-0'>
					<div className='text-center px-4 py-2 bg-purple-50 rounded-lg'>
						<div className='text-xs text-purple-600 font-medium'>
							Growth
						</div>
						<div className='text-xl font-bold text-purple-800'>
							Steady
						</div>
					</div>
				</div>
			</div>

			{/* Summary Stats */}
			<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
				<motion.div
					variants={itemVariants}
					className='bg-white p-5 rounded-xl border border-gray-100 shadow-sm'
				>
					<div className='text-gray-500 text-sm font-medium mb-1'>
						Total Backlinks
					</div>
					<div className='text-2xl font-bold text-gray-900'>
						{data.total.toLocaleString()}
					</div>
					<div className='text-xs text-green-600 mt-2 flex items-center'>
						<Icon icon='mdi:arrow-up' /> {profileData.newBacklinks}{" "}
						new
					</div>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className='bg-white p-5 rounded-xl border border-gray-100 shadow-sm'
				>
					<div className='text-gray-500 text-sm font-medium mb-1'>
						Referring Domains
					</div>
					<div className='text-2xl font-bold text-gray-900'>
						{data.referringDomains.toLocaleString()}
					</div>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className='bg-white p-5 rounded-xl border border-gray-100 shadow-sm'
				>
					<div className='text-gray-500 text-sm font-medium mb-1'>
						Authority Score
					</div>
					<div className='text-2xl font-bold text-gray-900'>
						{data.authorityScore}
					</div>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className='bg-white p-5 rounded-xl border border-gray-100 shadow-sm'
				>
					<div className='text-gray-500 text-sm font-medium mb-1'>
						Lost Backlinks
					</div>
					<div className='text-2xl font-bold text-orange-600'>
						{profileData.lostBacklinks}
					</div>
					<div className='text-xs text-gray-400 mt-2'>
						Last 30 days
					</div>
				</motion.div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Anchor Text Distribution */}
				<motion.div
					variants={itemVariants}
					className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'
				>
					<h3 className='text-lg font-bold text-gray-800 mb-6'>
						Anchor Categories
					</h3>
					<div className='flex flex-col md:flex-row items-center gap-6'>
						<div className='w-48 h-48'>
							<Doughnut
								data={anchorChartData}
								options={{
									maintainAspectRatio: false,
									plugins: { legend: { display: false } },
								}}
							/>
						</div>
					</div>
				</motion.div>

				{/* Link Attributes */}
				<motion.div
					variants={itemVariants}
					className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'
				>
					<h3 className='text-lg font-bold text-gray-800 mb-6'>
						Link Types
					</h3>
					<div className='flex flex-col md:flex-row items-center gap-6'>
						<div className='w-48 h-48'>
							<Pie
								data={followChartData}
								options={{
									maintainAspectRatio: false,
									plugins: { legend: { position: "right" } },
								}}
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default BacklinkAnalytic;
