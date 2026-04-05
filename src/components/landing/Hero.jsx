import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Hero = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.15 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 24 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
	};

	const stats = [
		{ label: "Reach", value: "2.4M", icon: "lucide:users", trend: "+12%" },
		{ label: "Conv.", value: "84K", icon: "lucide:target", trend: "+8%" },
		{ label: "Revenue", value: "$1.2M", icon: "lucide:dollar-sign", trend: "+24%" }
	];

	return (
		<section className="relative w-full overflow-hidden bg-primary-orange text-white">
			{/* Decorative background blobs — pointer-events-none so they never block tap */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
					className="absolute -top-1/4 -left-1/4 h-[60vw] w-[60vw] rounded-full bg-white/5 blur-[80px]"
				/>
				<motion.div
					animate={{ rotate: -360 }}
					transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
					className="absolute -bottom-1/4 -right-1/4 h-[70vw] w-[70vw] rounded-full bg-white/5 blur-[100px]"
				/>
			</div>

			{/* ─── Inner container — stacks vertically on mobile, side-by-side on xl ─── */}
			<motion.div
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 pb-16 pt-28 xl:flex-row xl:items-center xl:gap-16 xl:pb-0 xl:pt-0 xl:h-[860px]"
			>
				{/* ── LEFT: copy ── */}
				<div className="flex w-full flex-col items-center gap-6 text-center xl:w-5/12 xl:items-start xl:text-left">
					{/* Badge */}
					<motion.div
						variants={itemVariants}
						className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
					>
						<span className="h-2 w-2 animate-pulse rounded-full bg-yellow-300" />
						<span className="text-xs font-semibold uppercase tracking-widest text-yellow-300">
							Introducing Digital Marketing360
						</span>
					</motion.div>

					{/* Headline */}
					<motion.h1
						variants={itemVariants}
						className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
					>
						Scale Your Brand with{" "}
						<span className="bg-gradient-to-r from-yellow-300 to-blue-300 bg-clip-text text-transparent">
							Next-Gen Automation
						</span>
					</motion.h1>

					{/* Sub-copy */}
					<motion.p
						variants={itemVariants}
						className="max-w-lg text-sm leading-relaxed text-white/75 sm:text-base md:text-lg"
					>
						Stop juggling disconnected tools. Digital Marketing360 is your all-in-one command center
						for orchestrating email sequences, managing ad campaigns, and dominating social media.
					</motion.p>

					{/* CTA buttons */}
					<motion.div
						variants={itemVariants}
						className="flex w-full flex-col gap-3 sm:flex-row sm:w-auto"
					>
						<Link to="/onboarding" className="block w-full sm:w-auto">
							<button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-blue-900 shadow-xl transition-all hover:scale-[1.02] hover:shadow-2xl sm:w-auto">
								Start Free Trial
								<Icon icon="lucide:arrow-right" className="shrink-0" />
							</button>
						</Link>
						<button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10 sm:w-auto">
							<Icon icon="lucide:play-circle" className="shrink-0 text-xl" />
							See it in Action
						</button>
					</motion.div>

					{/* Social proof */}
					<motion.div variants={itemVariants} className="flex items-center gap-3 text-xs text-white/60">
						<div className="flex -space-x-2">
							{[11, 12, 13, 14].map((n) => (
								<img
									key={n}
									src={`https://i.pravatar.cc/40?img=${n}`}
									alt="user"
									className="h-8 w-8 rounded-full border-2 border-primary-orange object-cover"
								/>
							))}
						</div>
						<p>Trusted by 10,000+ marketing teams</p>
					</motion.div>
				</div>

				{/* ── RIGHT: dashboard mockup ── */}
				{/* On mobile this is a normal block; on xl it floats beside the copy */}
				<motion.div
					variants={itemVariants}
					className="w-full xl:w-7/12"
				>
					{/* ---- Campaign performance card ---- */}
					<motion.div
						animate={{ y: [0, -10, 0] }}
						transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
						className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl md:p-6"
					>
						{/* Card header */}
						<div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
							<div className="flex items-center gap-3">
								<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-yellow-400 to-blue-500 shadow">
									<Icon icon="lucide:bar-chart-2" className="text-white" />
								</div>
								<div>
									<p className="text-sm font-semibold leading-none">Campaign Performance</p>
									<p className="mt-0.5 text-[10px] text-white/50">Updated just now</p>
								</div>
							</div>
							<span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium">
								This Month
							</span>
						</div>

						{/* Stats row */}
						<div className="mb-4 grid grid-cols-3 gap-2 md:gap-3">
							{stats.map((s, i) => (
								<div key={i} className="flex flex-col gap-1 rounded-xl border border-white/5 bg-white/5 p-2 md:p-3">
									<Icon icon={s.icon} className="text-yellow-300 text-xs md:text-sm" />
									<p className="text-[10px] text-white/50">{s.label}</p>
									<p className="text-sm font-bold md:text-lg">{s.value}</p>
									<p className="text-[10px] font-semibold text-green-400">{s.trend}</p>
								</div>
							))}
						</div>

						{/* Mini chart */}
						<div className="h-24 w-full overflow-hidden rounded-xl border border-white/5 bg-gradient-to-t from-white/10 to-transparent md:h-36">
							<svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
								<defs>
									<linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#7cd2ff" stopOpacity="0.6" />
										<stop offset="100%" stopColor="#7cd2ff" stopOpacity="0" />
									</linearGradient>
								</defs>
								<path d="M0,100 Q10,70 20,80 T40,55 T60,70 T80,35 T100,45 L100,100 Z" fill="url(#hg)" />
								<path d="M0,80 Q10,50 20,60 T40,35 T60,50 T80,15 T100,25" fill="none" stroke="#7cd2ff" strokeWidth="2.5" strokeLinecap="round" />
							</svg>
						</div>
					</motion.div>

					{/* ---- Two small accent pills below the card (visible on all sizes) ---- */}
					<div className="mt-3 flex gap-3">
						<motion.div
							animate={{ y: [0, -6, 0] }}
							transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
							className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md"
						>
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-400/20">
								<Icon icon="lucide:check-circle-2" className="text-green-400" />
							</div>
							<div className="min-w-0">
								<p className="truncate text-xs font-semibold">Campaign Live</p>
								<p className="truncate text-[10px] text-white/50">"Q4 Launch" → 50k users</p>
							</div>
						</motion.div>
						<motion.div
							animate={{ y: [0, 6, 0] }}
							transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
							className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-md"
						>
							<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-400/20">
								<Icon icon="lucide:trending-up" className="text-blue-300" />
							</div>
							<div className="min-w-0">
								<p className="truncate text-xs font-semibold">SEO Health</p>
								<p className="truncate text-[10px] text-white/50">Score: 92 / 100 ↑</p>
							</div>
						</motion.div>
					</div>
				</motion.div>
			</motion.div>

			{/* Bottom curve */}
			<div className="h-12 rounded-bl-[60px] bg-white md:rounded-bl-[120px] xl:rounded-bl-[150px]" />
		</section>
	);
};

export default Hero;
