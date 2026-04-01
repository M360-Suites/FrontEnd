import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../../state/store";

const ManageSubscribersModal = ({ isOpen, onClose }) => {
	const {
		emailSubscribers,
		addEmailSubscriber,
		removeEmailSubscriber,
	} = useStore();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	const handleAdd = async () => {
		if (!name || !email) return;
		setIsAdding(true);
		await addEmailSubscriber({ name, email });
		setIsAdding(false);
		setName("");
		setEmail("");
	};

	const handleRemove = async (id) => {
		await removeEmailSubscriber(id);
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.95, opacity: 0 }}
				className='bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]'
			>
				<div className='p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50'>
					<h2 className='text-xl font-bold text-gray-800'>
						Manage Subscribers
					</h2>
					<button
						onClick={onClose}
						className='text-gray-500 hover:text-gray-700'
					>
						<Icon icon='mdi:close' className='text-2xl' />
					</button>
				</div>

				<div className='p-6 flex-1 overflow-y-auto'>
					{/* Add New */}
					<div className='bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100'>
						<h3 className='font-semibold text-sm mb-3 text-gray-700'>
							Add New Subscriber
						</h3>
						<div className='flex flex-col gap-3'>
							<input
								type='text'
								placeholder='Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='w-full p-2 border border-gray-200 rounded outline-none focus:border-primary-orange text-sm'
							/>
							<div className='flex gap-2'>
								<input
									type='email'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='flex-1 p-2 border border-gray-200 rounded outline-none focus:border-primary-orange text-sm'
								/>
								<button
									onClick={handleAdd}
									disabled={isAdding || !name || !email}
									className='bg-primary-orange text-white px-4 py-2 rounded text-sm font-medium disabled:opacity-50 hover:opacity-90 transition-opacity'
								>
									{isAdding ? "Adding..." : "Add"}
								</button>
							</div>
						</div>
					</div>

					{/* List */}
					<div>
						<h3 className='font-semibold text-sm mb-3 text-gray-700'>
							Current Subscribers ({emailSubscribers.length})
						</h3>
						<div className='space-y-2'>
							{emailSubscribers.length === 0 ? (
								<p className='text-gray-400 text-sm text-center py-4'>
									No subscribers yet.
								</p>
							) : (
								emailSubscribers.map((sub) => (
									<div
										key={sub.id}
										className='flex justify-between items-center p-3 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow'
									>
										<div className='flex items-center gap-3'>
											<div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs'>
												{sub.name.charAt(0)}
											</div>
											<div>
												<p className='font-medium text-sm text-gray-800'>
													{sub.name}
												</p>
												<p className='text-xs text-gray-500'>
													{sub.email}
												</p>
											</div>
										</div>
										<button
											onClick={() => handleRemove(sub.id)}
											className='text-gray-400 hover:text-red-500 transition-colors'
										>
											<Icon icon='mdi:trash-can-outline' />
										</button>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default ManageSubscribersModal;
