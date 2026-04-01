import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "../../../state/store";

const ImportContactsModal = ({ onClose, onImportSuccess }) => {
	const { addEmailSubscriber } = useStore();
	const [emails, setEmails] = useState(Array(5).fill(""));
	const [isDragging, setIsDragging] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);
	const [importMethod, setImportMethod] = useState("manual");
	const [emailErrors, setEmailErrors] = useState(Array(5).fill(""));
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const fileInputRef = useRef(null);
	const modalRef = useRef(null);

	// Close modal when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target)
			) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	// Handle email input change
	const handleEmailChange = (index, value) => {
		const newEmails = [...emails];
		newEmails[index] = value;
		setEmails(newEmails);

		// Clear error when typing
		const newErrors = [...emailErrors];
		newErrors[index] = "";
		setEmailErrors(newErrors);
		setError(null);
	};

	// Validate email format
	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return email === "" || re.test(String(email).toLowerCase());
	};

	// Handle file drop
	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);

		const file = e.dataTransfer.files[0];
		if (
			file &&
			(file.type === "text/csv" || file.name.endsWith(".csv"))
		) {
			handleFileUpload(file);
		} else {
			setError("Please upload a CSV file");
		}
	};

	// Handle file upload via input
	const handleFileUpload = (file) => {
		setUploadedFile(file);
		setError(null);
	};

	// ...

	// Handle form submission
	const handleSubmit = async () => {
		setIsLoading(true);
		setError(null);
		setSuccess(null);

		try {
			let count = 0;

			if (importMethod === "manual") {
				// Validate emails before submitting
				const newErrors = emails.map((email) =>
					email !== "" && !validateEmail(email)
						? "Invalid email format"
						: ""
				);

				setEmailErrors(newErrors);

				if (newErrors.some((error) => error !== "")) {
					setIsLoading(false);
					return;
				}

				// Filter out empty emails
				const validEmails = emails.filter(
					(email) => email.trim() !== ""
				);

				if (validEmails.length === 0) {
					setError("Please enter at least one email address");
					setIsLoading(false);
					return;
				}

				for (const email of validEmails) {
					await addEmailSubscriber({
						email,
						name: email.split("@")[0],
						source: "Manual Import",
					});
					count++;
				}
			} else {
				// Process uploaded file (Mock CSV parsing)
				if (!uploadedFile) {
					setError("Please upload a CSV file");
					setIsLoading(false);
					return;
				}

				// Simple client-side mock parse
				// In a real app we would use PapaParse or similar
				// For demo, we just pretend we parsed it and added some dummy emails or read the text
				const text = await uploadedFile.text();
				const lines = text.split("\n");
				// Skip header if present (assume first line is header if it contains 'email')
				const startIdx = lines[0].toLowerCase().includes("email")
					? 1
					: 0;

				for (let i = startIdx; i < lines.length; i++) {
					const line = lines[i].trim();
					if (line) {
						const parts = line.split(",");
						const email = parts[0]; // Assume first column is email
						if (validateEmail(email)) {
							await addEmailSubscriber({
								email,
								name: email.split("@")[0],
								source: "CSV Import",
							});
							count++;
						}
					}
				}
			}

			setSuccess(`Successfully imported ${count} subscriber(s)`);

			// Notify parent component of success
			if (onImportSuccess) {
				onImportSuccess();
			}

			// Close modal after 2 seconds
			setTimeout(() => {
				onClose();
			}, 2000);
		} catch (error) {
			console.error("Import error:", error);
			setError("Failed to import subscribers. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	// Download sample CSV template
	const handleDownloadTemplate = (e) => {
		e.preventDefault();
		const csvContent =
			"email\nexample1@email.com\nexample2@email.com\nexample3@email.com";
		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "subscriber_template.csv";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	};

	return (
		<AnimatePresence>
			<motion.div
				className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 px-4'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				<motion.div
					ref={modalRef}
					className='bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden'
					initial={{ scale: 0.9, y: 20 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 20 }}
					transition={{ type: "spring", damping: 25, stiffness: 300 }}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className='p-4 sm:p-6 border-b border-gray-200'>
						<div className='flex justify-between items-center'>
							<h2 className='text-xl font-semibold text-gray-800'>
								Import Contacts
							</h2>
							<button
								onClick={onClose}
								disabled={isLoading}
								className='text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50'
							>
								<Icon icon='mdi:close' className='text-xl' />
							</button>
						</div>
					</div>

					{/* Body */}
					<div className='p-4 sm:p-6'>
						{/* Success Message */}
						{success && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className='mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-lg flex items-center gap-2'
							>
								<Icon icon='mdi:check-circle' />
								<span className='text-sm'>{success}</span>
							</motion.div>
						)}

						{/* Error Message */}
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className='mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center gap-2'
							>
								<Icon icon='mdi:alert-circle' />
								<span className='text-sm'>{error}</span>
							</motion.div>
						)}

						{/* Import Method Tabs */}
						<div className='flex border-b border-gray-200 mb-6'>
							<button
								className={`px-4 py-2 font-medium text-sm transition-colors ${
									importMethod === "manual"
										? "text-primary-orange border-b-2 border-primary-orange"
										: "text-gray-500 hover:text-gray-700"
								}`}
								onClick={() => {
									setImportMethod("manual");
									setError(null);
								}}
								disabled={isLoading}
							>
								Enter Manually
							</button>
							<button
								className={`px-4 py-2 font-medium text-sm transition-colors ${
									importMethod === "file"
										? "text-primary-orange border-b-2 border-primary-orange"
										: "text-gray-500 hover:text-gray-700"
								}`}
								onClick={() => {
									setImportMethod("file");
									setError(null);
								}}
								disabled={isLoading}
							>
								Upload CSV
							</button>
						</div>

						<AnimatePresence mode='wait'>
							{importMethod === "manual" ? (
								<motion.div
									key='manual'
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
								>
									<p className='text-sm text-gray-600 mb-4'>
										Enter up to 5 email addresses below. For more than
										5 contacts, please use the CSV upload option.
									</p>

									<div className='space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-2'>
										{emails.map((email, index) => (
											<div key={index} className='relative'>
												<input
													type='email'
													value={email}
													onChange={(e) =>
														handleEmailChange(index, e.target.value)
													}
													placeholder={`Email address ${index + 1}`}
													disabled={isLoading}
													className={`w-full px-3 py-2 border ${
														emailErrors[index]
															? "border-red-500"
															: "border-gray-300"
													} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed`}
												/>
												{emailErrors[index] && (
													<p className='text-red-500 text-xs mt-1'>
														{emailErrors[index]}
													</p>
												)}
											</div>
										))}
									</div>
								</motion.div>
							) : (
								<motion.div
									key='file'
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
								>
									<div
										className={`border-2 border-dashed rounded-lg p-6 text-center ${
											isDragging
												? "border-primary-orange bg-primary-orange/5"
												: "border-gray-300"
										} transition-colors ${
											isLoading
												? "opacity-50 pointer-events-none"
												: ""
										}`}
										onDragOver={(e) => {
											e.preventDefault();
											setIsDragging(true);
										}}
										onDragLeave={() => setIsDragging(false)}
										onDrop={handleDrop}
									>
										<Icon
											icon={
												uploadedFile
													? "mdi:file-check"
													: "mdi:cloud-upload"
											}
											className={`text-4xl mx-auto mb-2 ${
												uploadedFile
													? "text-green-500"
													: "text-gray-400"
											}`}
										/>

										{uploadedFile ? (
											<div>
												<p className='text-sm font-medium text-gray-700'>
													{uploadedFile.name}
												</p>
												<p className='text-xs text-gray-500 mt-1'>
													{(uploadedFile.size / 1024).toFixed(2)} KB
												</p>
												<button
													onClick={() => {
														setUploadedFile(null);
														setError(null);
													}}
													disabled={isLoading}
													className='text-xs text-primary-orange hover:text-primary-orange/80 mt-2 disabled:opacity-50'
												>
													Remove file
												</button>
											</div>
										) : (
											<>
												<p className='text-sm font-medium text-gray-700'>
													Drag and drop your CSV file here
												</p>
												<p className='text-xs text-gray-500 mt-1 mb-3'>
													or
												</p>
												<button
													onClick={() => fileInputRef.current.click()}
													disabled={isLoading}
													className='px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50'
												>
													Browse Files
												</button>
												<input
													ref={fileInputRef}
													type='file'
													accept='.csv'
													className='hidden'
													onChange={(e) => {
														if (e.target.files[0]) {
															handleFileUpload(e.target.files[0]);
														}
													}}
												/>
											</>
										)}
									</div>

									<div className='mt-4'>
										<p className='text-sm text-gray-600 flex items-start'>
											<Icon
												icon='mdi:information'
												className='inline-block mr-1 text-blue-500 mt-0.5 flex-shrink-0'
											/>
											<span>
												Your CSV file should have an "email" column
												header (or "emails") and can contain up to 100
												contacts.
											</span>
										</p>
										<button
											onClick={handleDownloadTemplate}
											className='text-sm text-primary-orange hover:underline mt-2 inline-flex items-center gap-1'
										>
											<Icon icon='mdi:download' />
											Download sample template
										</button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					{/* Footer */}
					<div className='p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3'>
						<button
							onClick={onClose}
							disabled={isLoading}
							className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						>
							Cancel
						</button>
						<motion.button
							onClick={handleSubmit}
							disabled={isLoading}
							className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-colors flex items-center gap-2 ${
								isLoading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-primary-orange hover:bg-primary-orange/90"
							}`}
							whileHover={!isLoading ? { scale: 1.02 } : {}}
							whileTap={!isLoading ? { scale: 0.98 } : {}}
						>
							{isLoading ? (
								<>
									<Icon icon='mdi:loading' className='animate-spin' />
									Importing...
								</>
							) : (
								<>
									<Icon icon='mdi:upload' />
									Import Contacts
								</>
							)}
						</motion.button>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default ImportContactsModal;
