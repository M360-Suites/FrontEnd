import { seo } from "../../assets";

import { useState } from "react";

import { Icon } from "@iconify/react";
import useStore from "../../state/store";

const SEO = () => {
	const { analyzeDomain, seoData, isLoading } = useStore();
	const [url, setUrl] = useState("");
	const [analyzedDomain, setAnalyzedDomain] = useState(null);

	const handleAnalyze = async () => {
		if (!url) return;

		// Extract domain from URL
		let domain = url.replace(/(^\w+:|^)\/\//, "").split("/")[0];

		await analyzeDomain(domain);
		setAnalyzedDomain(domain);
	};

	const domainData = analyzedDomain ? seoData[analyzedDomain] : null;

	return (
		<div className='p-4'>
			<div className='flex flex-col md:flex-row justify-around items-center border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm'>
				<div className='flex flex-col gap-5 w-full md:w-1/2 mb-6 md:mb-0'>
					<div>
						<span className='font-bold text-xl md:text-2xl'>
							Monitor your site performance and health with our <br />{" "}
							SEO tools
						</span>
					</div>
					<div>
						<p className='text-gray-500 text-sm md:text-base'>
							Comprehensive analysis of your website’s SEO health and
							performance
						</p>
					</div>
					<div className='flex items-center'>
						<button className='px-6 py-2 md:px-8 md:py-3 bg-orange-gradient text-white rounded-xl'>
							Upgrade to use more SEO tools
						</button>
					</div>
				</div>

				<div className='w-full md:w-1/2 flex justify-center'>
					<img
						src={seo}
						alt='SEO Tools'
						className='max-w-full h-auto'
					/>
				</div>
			</div>

			{/* input section */}

			<div className='mt-10 p-4'>
				<div className='mb-4'>
					<span className=''>
						Enter your website URL to generate site health status
					</span>
				</div>
				<div className='flex flex-col md:flex-row gap-8'>
					<div className='flex-1 border bg-white border-gray-400 rounded-xl p-4'>
						<input
							className='w-full py-2 px-4 outline-none'
							type='text'
							placeholder='Enter your website URL (e.g. example.com)'
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
					</div>
					<div className='md:w-[250px] w-full md:mt-0'>
						<button
							onClick={handleAnalyze}
							disabled={isLoading || !url}
							className='bg-light-orange w-full h-full py-2 rounded-md text-white flex justify-center items-center gap-2 hover:bg-opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed'
						>
							{isLoading ? (
								<>
									<Icon
										icon='eos-icons:loading'
										className='text-xl'
									/>
									Analyzing...
								</>
							) : (
								"Analyze"
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Results Section */}
			{domainData && !isLoading && (
				<div className='mt-8 space-y-6 animate-fade-in'>
					<div className='flex justify-between items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
						<div>
							<h3 className='text-2xl font-bold text-gray-800'>
								{analyzedDomain}
							</h3>
							<p className='text-gray-500 text-sm'>
								Last updated:{" "}
								{new Date(domainData.lastAnalyzed).toLocaleString()}
							</p>
						</div>
						<div className='text-right'>
							<div
								className={`text-4xl font-bold ${
									domainData.healthScore > 80
										? "text-green-500"
										: domainData.healthScore > 50
										? "text-yellow-500"
										: "text-red-500"
								}`}
							>
								{domainData.healthScore}
							</div>
							<p className='text-gray-500 text-sm font-medium'>
								Health Score
							</p>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
						{/* Organic Search */}
						<div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
							<div className='flex items-center gap-2 mb-4'>
								<Icon
									icon='mdi:google'
									className='text-2xl text-blue-500'
								/>
								<h4 className='font-semibold text-lg'>
									Organic Search
								</h4>
							</div>
							<div className='space-y-4'>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>Keywords</span>
									<span className='font-bold text-lg'>
										{domainData.organicSearch?.keywords?.toLocaleString() ||
											0}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>Traffic</span>
									<span className='font-bold text-lg'>
										{domainData.organicSearch?.traffic?.toLocaleString() ||
											0}
									</span>
								</div>
							</div>
							<button
								onClick={() =>
									(window.location.href =
										"/seo-tools/keyword-overview")
								}
								className='w-full mt-4 py-2 border border-blue-100 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium'
							>
								View Keyword Overview
							</button>
						</div>

						{/* Backlinks */}
						<div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
							<div className='flex items-center gap-2 mb-4'>
								<Icon
									icon='mdi:link-variant'
									className='text-2xl text-purple-500'
								/>
								<h4 className='font-semibold text-lg'>Backlinks</h4>
							</div>
							<div className='space-y-4'>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>
										Total Backlinks
									</span>
									<span className='font-bold text-lg'>
										{domainData.backlinks?.total?.toLocaleString() ||
											0}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>
										Authority Score
									</span>
									<span className='font-bold text-lg'>
										{domainData.backlinks?.authorityScore || 0}
									</span>
								</div>
							</div>
							<button
								onClick={() =>
									(window.location.href = "/seo-tools/backlink-audit")
								}
								className='w-full mt-4 py-2 border border-purple-100 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium'
							>
								Audit Backlinks
							</button>
						</div>

						{/* Traffic */}
						<div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
							<div className='flex items-center gap-2 mb-4'>
								<Icon
									icon='mdi:chart-line'
									className='text-2xl text-green-500'
								/>
								<h4 className='font-semibold text-lg'>Traffic</h4>
							</div>
							<div className='space-y-4'>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>Visits</span>
									<span className='font-bold text-lg'>
										{domainData.trafficAnalytics?.visits?.toLocaleString() ||
											0}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>Bounce Rate</span>
									<span className='font-bold text-lg'>
										{domainData.trafficAnalytics?.bounceRate || "0%"}
									</span>
								</div>
							</div>
							<button
								onClick={() =>
									(window.location.href =
										"/seo-tools/traffic-analytics")
								}
								className='w-full mt-4 py-2 border border-green-100 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium'
							>
								Traffic Analytics
							</button>
						</div>

						{/* Site Health */}
						<div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
							<div className='flex items-center gap-2 mb-4'>
								<Icon
									icon='mdi:heart-pulse'
									className='text-2xl text-red-500'
								/>
								<h4 className='font-semibold text-lg'>Site Health</h4>
							</div>
							<div className='space-y-4'>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>Score</span>
									<span
										className={`font-bold text-lg ${
											domainData.healthScore > 80
												? "text-green-500"
												: "text-orange-500"
										}`}
									>
										{domainData.healthScore}/100
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-gray-600'>Issues</span>
									<span className='font-bold text-lg'>
										{(domainData.siteAudit?.issues?.errors || 0) +
											(domainData.siteAudit?.issues?.warnings || 0)}
									</span>
								</div>
							</div>
							<button
								onClick={() =>
									(window.location.href = "/seo-tools/site-audit")
								}
								className='w-full mt-4 py-2 border border-red-100 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium'
							>
								Full Site Audit
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default SEO;
