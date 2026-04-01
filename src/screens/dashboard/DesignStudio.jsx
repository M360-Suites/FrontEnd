import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import ReactDOM from "react-dom";

const DesignStudio = () => {
	const [showEditor, setShowEditor] = useState(false);

	useEffect(() => {
		// Log to ensure the component is mounting
		console.log("DesignStudio mounted");
	}, []);

	// Function to toggle default state
	const handleStartDesigning = () => {
		setShowEditor(true);
	};

	// Function to close the editor
	const handleCloseEditor = () => {
		// Confirm before closing if needed, for now just close
		setShowEditor(false);
	};

	const EditorModal = () => {
		return ReactDOM.createPortal(
			<motion.div
				className='fixed inset-0 z-[9999] flex flex-col bg-white'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 20 }}
				transition={{ duration: 0.3 }}
			>
				{/* Editor Header / Toolbar */}
				<div className='h-16 border-b border-gray-200 bg-white flex justify-between items-center px-6 shadow-sm z-20'>
					<div className='flex items-center gap-3'>
						<div className='bg-gradient-to-r from-orange-400 to-red-500 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md'>
							<Icon
								icon='fluent:design-ideas-24-filled'
								className='text-xl'
							/>
						</div>
						<span className='font-bold text-gray-800 text-lg tracking-wide'>
							Design Studio{" "}
							<span className='text-gray-400 font-normal'>
								Editor
							</span>
						</span>
					</div>
					<div className='flex items-center gap-4'>
						<button
							onClick={handleCloseEditor}
							className='flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-gray-200 hover:border-red-200'
						>
							<Icon icon='mdi:close' className='text-lg' />
							Exit Studio
						</button>
					</div>
				</div>

				{/* Iframe Container */}
				<div className='flex-1 w-full relative bg-gray-100'>
					<iframe
						src='https://app.templated.io/editor?embed=c8179283-2a7d-4396-80ba-60e684b6e462'
						className='absolute inset-0 w-full h-full border-0'
						allow='clipboard-write; clipboard-read'
						title='Templated.io Design Editor'
					/>
				</div>
			</motion.div>,
			document.body,
		);
	};

	return (
		<div className='w-full h-full min-h-[calc(100vh-100px)] bg-gray-50 flex flex-col relative'>
			{/* Landing View */}
			<div className='flex flex-col items-center justify-center flex-1 px-4 md:px-6 py-12'>
				<motion.div
					className='space-y-6 text-center max-w-4xl'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className='inline-block p-4 rounded-full bg-blue-50 mb-4'>
						<Icon
							icon='mdi:brush-variant'
							className='text-5xl text-blue-600'
						/>
					</div>

					<motion.h1
						className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.8 }}
					>
						Unleash Your{" "}
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'>
							Creativity
						</span>
					</motion.h1>
					<motion.p
						className='text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4, duration: 0.8 }}
					>
						Create stunning visuals, marketing assets, and social
						media posts with our professional-grade design studio. No
						design experience required.
					</motion.p>
				</motion.div>

				<motion.div
					className='mt-12'
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						delay: 0.6,
						duration: 0.5,
						type: "spring",
						stiffness: 200,
					}}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<button
						onClick={handleStartDesigning}
						className='group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all overflow-hidden'
					>
						<span className='absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10'></span>
						{/* <Icon icon="ph:magic-wand-fill" className="text-2xl" /> */}
						<span>Launch Layout Studio</span>
						<Icon
							icon='lucide:arrow-right'
							className='text-xl group-hover:translate-x-1 transition-transform'
						/>
					</button>
				</motion.div>

				{/* Features Grid */}
				<motion.div
					className='mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full'
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.8 }}
				>
					{[
						{
							icon: "fluent:layer-24-filled",
							title: "Drag & Drop",
							desc: "Intuitive interface designed for speed and ease of use.",
							color: "text-blue-500",
							bg: "bg-blue-50",
						},
						{
							icon: "fluent:image-library-24-filled",
							title: "Premium Assets",
							desc: "Millions of stock photos, icons, and illustrations.",
							color: "text-purple-500",
							bg: "bg-purple-50",
						},
						{
							icon: "fluent:arrow-download-24-filled",
							title: "One-Click Export",
							desc: "Download in PNG, JPG, or PDF ready for publishing.",
							color: "text-green-500",
							bg: "bg-green-50",
						},
					].map((item, idx) => (
						<div
							key={idx}
							className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl hover:border-blue-100 transition-all duration-300 group'
						>
							<div
								className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 transition-transform duration-300`}
							>
								<Icon icon={item.icon} />
							</div>
							<h3 className='font-bold text-xl mb-3 text-gray-800'>
								{item.title}
							</h3>
							<p className='text-gray-500 leading-relaxed'>
								{item.desc}
							</p>
						</div>
					))}
				</motion.div>
			</div>

			<AnimatePresence>
				{showEditor && <EditorModal />}
			</AnimatePresence>
		</div>
	);
};

export default DesignStudio;
