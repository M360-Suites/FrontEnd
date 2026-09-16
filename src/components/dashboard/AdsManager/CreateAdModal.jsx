import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import InsufficientFundsModal from "./InsufficientFundsModal";

const CreateAdModal = ({ isOpen, onClose, selectedPlatform, onAdCreated }) => {
	const [name, setName]         = useState("");
	const [budget, setBudget]     = useState("500");
	const [duration, setDuration] = useState("7 days");
	const [isLoading, setIsLoading] = useState(false);
	const [showFunds, setShowFunds] = useState(false);

	const handleCreate = async () => {
		if (!name) { alert("Please enter a campaign name"); return; }
		setIsLoading(true);
		// Simulate a brief "checking" delay then always return insufficient funds
		await new Promise((r) => setTimeout(r, 1200));
		setIsLoading(false);
		setShowFunds(true); // Always show insufficient funds modal
	};

	if (!isOpen) return null;

	const platformIcon = {
		Facebook: "logos:facebook",
		Instagram: "skill-icons:instagram",
		Twitter: "ri:twitter-x-fill",
		X: "ri:twitter-x-fill",
		LinkedIn: "logos:linkedin-icon",
		TikTok: "logos:tiktok-icon",
		Google: "logos:google-ads",
	}[selectedPlatform] || "mdi:web";

	return (
		<>
			{/* Insufficient funds modal — sits on top */}
			<InsufficientFundsModal
				isOpen={showFunds}
				onClose={() => { setShowFunds(false); onClose(); }}
				platform={selectedPlatform || "Meta"}
				budget={budget}
			/>

			<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
				<motion.div
					initial={{ scale: 0.92, opacity: 0, y: 20 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					exit={{ scale: 0.92, opacity: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 25 }}
					className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
				>
					{/* Header */}
					<div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
						<div className="flex items-center gap-3">
							<div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
								<Icon icon={platformIcon} className="text-2xl" />
							</div>
							<div>
								<h2 className="text-lg font-bold text-gray-800">Create Ad Campaign</h2>
								<p className="text-xs text-gray-500">via {selectedPlatform || "Platform"} Ads</p>
							</div>
						</div>
						<button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
							<Icon icon="mdi:close" className="text-xl" />
						</button>
					</div>

					<div className="p-6 space-y-5">
						{/* Platform display */}
						<div>
							<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Platform</label>
							<div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
								<Icon icon={platformIcon} className="text-2xl" />
								<span className="font-semibold text-gray-800">{selectedPlatform || "Select Platform"}</span>
								<span className="ml-auto text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
									<Icon icon="mdi:check-circle" className="text-xs" /> Connected
								</span>
							</div>
						</div>

						{/* Campaign name */}
						<div>
							<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Campaign Name *</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 text-sm"
								placeholder="e.g. Summer Sale, Brand Awareness"
							/>
						</div>

						{/* Budget */}
						<div>
							<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Daily Budget (USD)</label>
							<div className="relative">
								<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
								<input
									type="number"
									value={budget}
									onChange={(e) => setBudget(e.target.value)}
									className="w-full pl-7 pr-3 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 text-sm"
								/>
							</div>
							{/* Budget suggestions */}
							<div className="flex gap-2 mt-2">
								{["50", "100", "250", "500"].map((v) => (
									<button key={v} onClick={() => setBudget(v)} className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors ${budget === v ? "border-orange-400 bg-orange-50 text-orange-600 font-semibold" : "border-gray-200 text-gray-500 hover:border-orange-300"}`}>
										${v}
									</button>
								))}
							</div>
						</div>

						{/* Duration */}
						<div>
							<label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Duration</label>
							<div className="grid grid-cols-4 gap-2">
								{["3 days", "7 days", "14 days", "30 days"].map((d) => (
									<button key={d} onClick={() => setDuration(d)} className={`text-xs py-2 rounded-xl border font-medium transition-colors ${duration === d ? "border-orange-400 bg-orange-50 text-orange-600" : "border-gray-200 text-gray-600 hover:border-orange-300"}`}>
										{d}
									</button>
								))}
							</div>
						</div>

						{/* Estimated reach */}
						<div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
							<p className="text-xs font-semibold text-blue-700 mb-2 flex items-center gap-1">
								<Icon icon="mdi:chart-line" /> Estimated Campaign Reach
							</p>
							<div className="grid grid-cols-3 gap-3">
								{[
									{ label: "Impressions", value: `${Math.round(Number(budget) * 120).toLocaleString()}` },
									{ label: "Clicks",      value: `${Math.round(Number(budget) * 4).toLocaleString()}` },
									{ label: "Est. CTR",    value: "3.2%" },
								].map((s) => (
									<div key={s.label} className="text-center">
										<p className="font-bold text-gray-800 text-sm">{s.value}</p>
										<p className="text-[10px] text-gray-500">{s.label}</p>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="px-6 pb-6 flex gap-3">
						<button onClick={onClose} className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
							Cancel
						</button>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={handleCreate}
							disabled={isLoading || !name}
							className={`flex-1 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${isLoading || !name ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"}`}
						>
							{isLoading ? (
								<>
									<motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
									Launching...
								</>
							) : (
								<>
									<Icon icon="mdi:rocket-launch" />
									Launch Campaign
								</>
							)}
						</motion.button>
					</div>
				</motion.div>
			</div>
		</>
	);
};

export default CreateAdModal;
