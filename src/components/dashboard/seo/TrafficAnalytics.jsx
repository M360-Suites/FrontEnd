import { useState, useEffect, useRef } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { Icon } from "@iconify/react/dist/iconify.js";
import useStore from "../../../state/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Register Chart.js components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
);

const TrafficAnalytics = () => {
	const { seoData, analyzeDomain, isLoading } = useStore();
	const navigate = useNavigate();
	const [domain, setDomain] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		const domains = Object.keys(seoData);
		if (domains.length > 0) {
			const currentDomain = domains[domains.length - 1];
			setDomain(currentDomain);
			setData(seoData[currentDomain]?.trafficAnalytics);
		}
	}, [seoData]);

	if (!domain || !data) {
		return (
			<div className='flex flex-col items-center justify-center min-h-[50vh]'>
				<Icon
					icon='mdi:chart-line-variant'
					className='text-6xl text-gray-300 mb-4'
				/>
				<h2 className='text-xl font-bold text-gray-700 mb-2'>
					No Traffic Data Found
				</h2>
				<p className='text-gray-500 mb-6'>
					Please analyze a domain in the SEO Dashboard first.
				</p>
				<button
					onClick={() => navigate("/seo-tools")}
					className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors'
				>
					Go to Dashboard
				</button>
			</div>
		);
	}

	// Chart Data Preparation
	const lineChartData = {
		labels: data.history.map((d) => d.month),
		datasets: [
			{
				label: "Total Visits",
				data: data.history.map((d) => d.visits),
				borderColor: "rgb(34, 197, 94)",
				backgroundColor: "rgba(34, 197, 94, 0.5)",
				tension: 0.4,
			},
			{
				label: "Unique Visitors",
				data: data.history.map((d) => d.unique),
				borderColor: "rgb(59, 130, 246)",
				backgroundColor: "rgba(59, 130, 246, 0.5)",
				tension: 0.4,
			},
		],
	};

	const lineOptions = {
		responsive: true,
		plugins: {
			legend: { position: "top" },
			title: { display: false },
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: { color: "rgba(0,0,0,0.05)" },
			},
			x: {
				grid: { display: false },
			},
		},
	};

	const sourceData = {
		labels: Object.keys(data.sources),
		datasets: [
			{
				data: Object.values(data.sources),
				backgroundColor: [
					"rgba(34, 197, 94, 0.8)", // Organic - Green
					"rgba(59, 130, 246, 0.8)", // Direct - Blue
					"rgba(249, 115, 22, 0.8)", // Referral - Orange
					"rgba(168, 85, 247, 0.8)", // Social - Purple
					"rgba(239, 68, 68, 0.8)", // Paid - Red
				],
				borderWidth: 1,
			},
		],
	};

	const doughnutOptions = {
		responsive: true,
		plugins: {
			legend: { position: "right" },
		},
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
			<div className='flex flex-col sm:flex-row justify-between items-center bg-white p-6 rounded-xl border border-green-100 shadow-sm'>
				<div>
					<h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
						<Icon
							icon='mdi:chart-timeline-variant'
							className='text-green-600'
						/>
						Traffic Analytics
					</h1>
					<p className='text-gray-500 text-sm mt-1'>{domain}</p>
				</div>
				<div className='flex gap-2 mt-4 sm:mt-0'>
					<span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium'>
						Live Data
					</span>
					<span className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm'>
						Last 12 Months
					</span>
				</div>
			</div>

			{/* Summary Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
				{[
					{
						label: "Total Visits",
						value: data.visits.toLocaleString(),
						icon: "mdi:account-group",
						color: "text-green-600",
						bg: "bg-green-50",
					},
					{
						label: "Unique Visitors",
						value: data.uniqueVisitors.toLocaleString(),
						icon: "mdi:account-check",
						color: "text-blue-600",
						bg: "bg-blue-50",
					},
					{
						label: "Pages / Visit",
						value: data.pagesPerVisit,
						icon: "mdi:file-document-multiple",
						color: "text-purple-600",
						bg: "bg-purple-50",
					},
					{
						label: "Avg. Duration",
						value: data.avgVisitDuration,
						icon: "mdi:clock-outline",
						color: "text-orange-600",
						bg: "bg-orange-50",
					},
					{
						label: "Bounce Rate",
						value: data.bounceRate,
						icon: "mdi:exit-run",
						color: "text-red-600",
						bg: "bg-red-50",
					},
				].map((item, idx) => (
					<motion.div
						key={idx}
						variants={itemVariants}
						className='bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
					>
						<div className={`p-3 rounded-lg w-fit ${item.bg} mb-3`}>
							<Icon
								icon={item.icon}
								className={`text-2xl ${item.color}`}
							/>
						</div>
						<h3 className='text-gray-500 text-sm font-medium'>
							{item.label}
						</h3>
						<p className='text-xl font-bold text-gray-800 mt-1'>
							{item.value}
						</p>
					</motion.div>
				))}
			</div>

			{/* Main Chart */}
			<motion.div
				variants={itemVariants}
				className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'
			>
				<h2 className='text-lg font-bold text-gray-800 mb-6'>
					Traffic Trend
				</h2>
				<div className='h-[350px]'>
					<Line data={lineChartData} options={lineOptions} />
				</div>
			</motion.div>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				{/* Traffic Sources */}
				<motion.div
					variants={itemVariants}
					className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'
				>
					<h2 className='text-lg font-bold text-gray-800 mb-6'>
						Traffic Sources (%)
					</h2>
					<div className='h-[300px] flex justify-center'>
						<Doughnut data={sourceData} options={doughnutOptions} />
					</div>
				</motion.div>

				{/* Geo Distribution */}
				<motion.div
					variants={itemVariants}
					className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'
				>
					<h2 className='text-lg font-bold text-gray-800 mb-6'>
						Top Countries
					</h2>
					<div className='space-y-4'>
						{data.geo.map((country, idx) => (
							<div key={idx} className='flex items-center gap-4'>
								<span className='text-gray-400 font-mono w-6 text-right'>
									{idx + 1}
								</span>
								<div className='flex-1'>
									<div className='flex justify-between mb-1'>
										<span className='font-medium text-gray-700'>
											{country.country}
										</span>
										<span className='font-semibold text-gray-900'>
											{country.percent}%
										</span>
									</div>
									<div className='w-full bg-gray-100 rounded-full h-2'>
										<div
											className='bg-blue-500 h-2 rounded-full'
											style={{ width: `${country.percent}%` }}
										></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default TrafficAnalytics;
