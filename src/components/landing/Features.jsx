import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const features = [
	{
		title: "Design Studio",
		desc: "Canva-like intuitive design environment to create stunning visuals and ad creatives in seconds.",
		icon: "lucide:palette",
		color: "text-indigo-500",
		bg: "bg-indigo-50"
	},
	{
		title: "Ads Management",
		desc: "Launch, track, and optimize campaigns across Google, Meta, and TikTok from one dashboard.",
		icon: "lucide:target",
		color: "text-red-500",
		bg: "bg-red-50"
	},
	{
		title: "Social Listening",
		desc: "Monitor brand mentions and sentiment across the web in real-time.",
		icon: "lucide:ear",
		color: "text-yellow-600",
		bg: "bg-yellow-50"
	},
	{
		title: "Social Scheduler",
		desc: "Plan a month of content in minutes across all major social media platforms effortlessly.",
		icon: "lucide:calendar-clock",
		color: "text-pink-500",
		bg: "bg-pink-50"
	},
	{
		title: "Automated Marketing",
		desc: "Deploy campaigns that run while you sleep, multiplying your reach without extra effort.",
		icon: "lucide:rocket",
		color: "text-blue-500",
		bg: "bg-blue-50"
	},
	{
		title: "SEO Analytics",
		desc: "Outrank competitors with data-driven keywords, site audits, and backlink tracking strategies.",
		icon: "lucide:bar-chart-3",
		color: "text-green-500",
		bg: "bg-green-50"
	},
	{
		title: "Social Analytics",
		desc: "Gain comprehensive insights into engagement rates, audience growth, and post performance.",
		icon: "lucide:pie-chart",
		color: "text-sky-500",
		bg: "bg-sky-50"
	},
	{
		title: "Lead Generation",
		desc: "Capture and nurture high-quality leads dynamically with integrated marketing funnels.",
		icon: "lucide:users",
		color: "text-orange-500",
		bg: "bg-orange-50"
	},
	{
		title: "AI-Powered Intelligence",
		desc: "Gain deep insights into customer behaviors and patterns with our robust AI algorithms.",
		icon: "lucide:brain-circuit",
		color: "text-purple-500",
		bg: "bg-purple-50"
	},
];

const Features = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	};

	return (
		<section className="py-24 bg-gray-50 border-t border-gray-100">
			<div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<motion.div 
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<p className="text-sm font-bold tracking-widest text-light-orange uppercase mb-3">Core Features</p>
						<h2 className="text-3xl md:text-5xl font-bold text-primary-orange mb-6">
							Unlock Your Growth Potential
						</h2>
						<p className="text-lg text-gray-600">
							Everything you need to attract, engage, and convert your audience is built right in.
						</p>
					</motion.div>
				</div>

				<motion.div 
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					{features.map((feature, idx) => (
						<motion.div 
							key={idx}
							variants={itemVariants}
							className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
						>
							<div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
								<Icon icon={feature.icon} className={`text-2xl ${feature.color}`} />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
							<p className="text-gray-600 leading-relaxed">{feature.desc}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Features;
