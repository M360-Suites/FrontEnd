import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useStore from "../../../state/store";
import ImportContactsModal from "./ImportContactsModal";

const EmailSubscribers = () => {
	const { emailSubscribers, removeEmailSubscriber, fetchEmailSubscribers } = useStore();
	const [subscribers, setSubscribers] = useState([]);
	const [selectedSubscribers, setSelectedSubscribers] = useState([]);
	const [sourceFilter, setSourceFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [showActionMenu, setShowActionMenu] = useState(false);
	const [actionMenuId, setActionMenuId] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [openImportModal, setOpenImportModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		totalSubscribers: 0,
		limit: 10,
	});

	// Load subscribers from API on mount
	useEffect(() => {
		loadSubscribers();
		fetchEmailSubscribers().catch((err) => {
			console.error("Failed to fetch subscribers:", err);
		});
	}, []);

	const loadSubscribers = () => {
		// Sync with store
		setSubscribers(emailSubscribers);
		setPagination({
			currentPage: 1,
			totalPages: Math.ceil(emailSubscribers.length / 10) || 1,
			totalSubscribers: emailSubscribers.length,
			limit: 10,
		});
	};

	const handleToggleImportModal = () => {
		setOpenImportModal(!openImportModal);
	};

	const handleImportSuccess = () => {
		// Refresh subscriber list from API after a successful import
		fetchEmailSubscribers().catch((err) => {
			console.error("Refresh after import failed:", err);
		});
	};

	// Filter subscribers based on selected filters and search term
	const filteredSubscribers = subscribers.filter((subscriber) => {
		const matchesSource =
			sourceFilter === "" || subscriber.source === sourceFilter;
		const matchesStatus =
			statusFilter === "" ||
			subscriber.status.toLowerCase() === statusFilter.toLowerCase();
		const matchesSearch =
			searchTerm === "" ||
			subscriber.email
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			(subscriber.name &&
				subscriber.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase()));

		return matchesSource && matchesStatus && matchesSearch;
	});

	// Handle checkbox selection
	const handleSelectSubscriber = (id) => {
		if (selectedSubscribers.includes(id)) {
			setSelectedSubscribers(
				selectedSubscribers.filter(
					(subscriberId) => subscriberId !== id
				)
			);
		} else {
			setSelectedSubscribers([...selectedSubscribers, id]);
		}
	};

	// Handle select all
	const handleSelectAll = () => {
		if (selectedSubscribers.length === filteredSubscribers.length) {
			setSelectedSubscribers([]);
		} else {
			setSelectedSubscribers(
				filteredSubscribers.map((subscriber) => subscriber._id)
			);
		}
	};

	// Handle delete selected subscribers
	const handleDeleteSelected = async () => {
		for (const id of selectedSubscribers) {
			await removeEmailSubscriber(id);
		}
		setSelectedSubscribers([]);
		setShowActionMenu(false);
	};

	// Handle individual subscriber actions
	const toggleActionMenu = (id) => {
		if (actionMenuId === id) {
			setActionMenuId(null);
		} else {
			setActionMenuId(id);
		}
	};

	// Handle delete single subscriber
	const handleDeleteSubscriber = async (id) => {
		await removeEmailSubscriber(id);
		setActionMenuId(null);
	};

	// Get engagement rate color
	const getEngagementColor = (rate) => {
		if (rate >= 80) return "text-green-600";
		if (rate >= 50) return "text-yellow-600";
		return "text-red-600";
	};

	// Get status badge color
	const getStatusColor = (status) => {
		const statusLower = status?.toLowerCase();
		switch (statusLower) {
			case "active":
				return "bg-green-100 text-green-800";
			case "inactive":
				return "bg-gray-100 text-gray-800";
			case "unsubscribed":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<>
			{openImportModal && (
				<ImportContactsModal
					onClose={handleToggleImportModal}
					onImportSuccess={handleImportSuccess}
				/>
			)}
			<div className='p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen'>
				{/* Header and Filters */}
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6'>
					<h1 className='text-xl md:text-2xl font-bold text-gray-800'>
						Email Subscribers
					</h1>
					<div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto'>
						{/* Search Input */}
						<div className='relative'>
							<input
								type='text'
								placeholder='Search by email'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm w-full sm:w-[200px] focus:outline-none focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange'
							/>
							<Icon
								icon='mdi:magnify'
								className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'
							/>
						</div>

						{/* Source Filter */}
						<div className='relative'>
							<select
								value={sourceFilter}
								onChange={(e) => setSourceFilter(e.target.value)}
								className='appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange'
							>
								<option value=''>All Sources</option>
								<option value='Imported'>Imported</option>
								<option value='Website'>Website</option>
								<option value='Social Ads'>Social Ads</option>
							</select>
							<Icon
								icon='mdi:chevron-down'
								className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none'
							/>
						</div>

						{/* Status Filter */}
						<div className='relative'>
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className='appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary-orange/30 focus:border-primary-orange'
							>
								<option value=''>All Status</option>
								<option value='active'>Active</option>
								<option value='inactive'>Inactive</option>
								<option value='unsubscribed'>Unsubscribed</option>
							</select>
							<Icon
								icon='mdi:chevron-down'
								className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none'
							/>
						</div>

						{/* Import Subscribers Button */}
						<button
							onClick={handleToggleImportModal}
							className='bg-primary-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-orange/90 transition-colors flex items-center justify-center'
						>
							<Icon icon='mdi:upload' className='mr-1' />
							Import Subscribers
						</button>
					</div>
				</div>

				{/* Error Message */}
				{error && (
					<div className='mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center gap-2'>
						<Icon icon='mdi:alert-circle' />
						<span className='text-sm'>{error}</span>
					</div>
				)}

				{/* Selected Actions Menu */}
				{selectedSubscribers.length > 0 && (
					<div className='bg-white rounded-lg shadow-sm p-3 mb-4 flex justify-between items-center'>
						<div className='flex items-center'>
							<span className='text-sm font-medium text-gray-700'>
								{selectedSubscribers.length}{" "}
								{selectedSubscribers.length === 1
									? "subscriber"
									: "subscribers"}{" "}
								selected
							</span>
						</div>
						<div className='flex gap-2 relative'>
							<button
								className='text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-md text-sm font-medium flex items-center transition-colors'
								onClick={() => setShowActionMenu(!showActionMenu)}
							>
								Actions
								<Icon icon='mdi:chevron-down' className='ml-1' />
							</button>
							{showActionMenu && (
								<div className='absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 border border-gray-200'>
									<button
										className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
										onClick={() => {
											/* Handle export action */
										}}
									>
										<Icon icon='mdi:download' className='mr-2' />
										Export
									</button>
									<button
										className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
										onClick={() => {
											/* Handle tag action */
										}}
									>
										<Icon icon='mdi:tag' className='mr-2' />
										Add Tag
									</button>
									<button
										className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-red-600'
										onClick={handleDeleteSelected}
									>
										<Icon icon='mdi:delete' className='mr-2' />
										Delete
									</button>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Subscribers Table */}
				<div className='bg-white rounded-lg shadow-sm overflow-hidden'>
					{/* Table Header */}
					<div className='hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200'>
						<div className='flex items-center'>
							<input
								type='checkbox'
								checked={
									selectedSubscribers.length ===
										filteredSubscribers.length &&
									filteredSubscribers.length > 0
								}
								onChange={handleSelectAll}
								className='w-4 h-4 text-primary-orange rounded focus:ring-primary-orange accent-primary-orange'
							/>
							<span className='ml-3 text-sm font-medium text-gray-700'>
								Email Address
							</span>
						</div>
						<div className='text-sm font-medium text-gray-700'>
							Source
						</div>
						<div className='text-sm font-medium text-gray-700'>
							Date Added
						</div>
						<div className='text-sm font-medium text-gray-700'>
							Engagement Rate
						</div>
						<div className='text-sm font-medium text-gray-700'>
							Status
						</div>
						<div className='text-sm font-medium text-gray-700 text-right'>
							Actions
						</div>
					</div>

					{/* Mobile Header */}
					<div className='md:hidden p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center'>
						<div className='flex items-center'>
							<input
								type='checkbox'
								checked={
									selectedSubscribers.length ===
										filteredSubscribers.length &&
									filteredSubscribers.length > 0
								}
								onChange={handleSelectAll}
								className='w-4 h-4 text-primary-orange rounded focus:ring-primary-orange accent-primary-orange'
							/>
							<span className='ml-2 text-sm font-medium text-gray-700'>
								Select All
							</span>
						</div>
						<span className='text-sm font-medium text-gray-700'>
							{filteredSubscribers.length} Subscribers
						</span>
					</div>

					{/* Table Body */}
					<div className='divide-y divide-gray-200'>
						{isLoading ? (
							<div className='py-12 text-center'>
								<Icon
									icon='mdi:loading'
									className='text-4xl text-primary-orange mx-auto mb-4 animate-spin'
								/>
								<p className='text-gray-500'>
									Loading subscribers...
								</p>
							</div>
						) : filteredSubscribers.length > 0 ? (
							filteredSubscribers.map((subscriber) => (
								<div
									key={subscriber._id}
									className='hover:bg-gray-50 transition-colors'
								>
									{/* Desktop Row */}
									<div className='hidden md:grid grid-cols-6 gap-4 p-4 items-center'>
										<div className='flex items-center'>
											<input
												type='checkbox'
												checked={selectedSubscribers.includes(
													subscriber._id
												)}
												onChange={() =>
													handleSelectSubscriber(subscriber._id)
												}
												className='w-4 h-4 text-primary-orange rounded focus:ring-primary-orange accent-primary-orange'
											/>
											<div className='ml-3'>
												<span className='font-medium text-gray-800 block'>
													{subscriber.email}
												</span>
												{subscriber.name &&
													subscriber.name !== "Unknown Name" && (
														<span className='text-xs text-gray-500'>
															{subscriber.name}
														</span>
													)}
											</div>
										</div>
										<div className='text-sm text-gray-600'>
											{subscriber.source || "Imported"}
										</div>
										<div className='text-sm text-gray-600'>
											{subscriber.createdAt
												? new Date(
														subscriber.createdAt
												  ).toLocaleDateString("en-US", {
														year: "numeric",
														month: "short",
														day: "numeric",
												  })
												: "-"}
										</div>
										<div
											className={`text-sm font-medium ${getEngagementColor(
												subscriber.engagementRate || 0
											)}`}
										>
											{subscriber.engagementRate || 0}%
										</div>
										<div>
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
													subscriber.status || "active"
												)}`}
											>
												{subscriber.status || "Active"}
											</span>
										</div>
										<div className='text-right relative'>
											<button
												className='text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100'
												onClick={() =>
													toggleActionMenu(subscriber._id)
												}
											>
												<Icon
													icon='mdi:dots-vertical'
													className='text-xl'
												/>
											</button>
											{actionMenuId === subscriber._id && (
												<div className='absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 border border-gray-200 min-w-[150px]'>
													<button
														className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
														onClick={() => {
															/* Handle view details action */
															setActionMenuId(null);
														}}
													>
														<Icon icon='mdi:eye' className='mr-2' />
														View Details
													</button>
													<button
														className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
														onClick={() => {
															/* Handle edit action */
															setActionMenuId(null);
														}}
													>
														<Icon
															icon='mdi:pencil'
															className='mr-2'
														/>
														Edit
													</button>
													<button
														className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-red-600'
														onClick={() =>
															handleDeleteSubscriber(subscriber._id)
														}
													>
														<Icon
															icon='mdi:delete'
															className='mr-2'
														/>
														Delete
													</button>
												</div>
											)}
										</div>
									</div>

									{/* Mobile Row */}
									<div className='md:hidden p-4'>
										<div className='flex items-start'>
											<input
												type='checkbox'
												checked={selectedSubscribers.includes(
													subscriber._id
												)}
												onChange={() =>
													handleSelectSubscriber(subscriber._id)
												}
												className='w-4 h-4 text-primary-orange rounded focus:ring-primary-orange accent-primary-orange mt-1'
											/>
											<div className='ml-3 flex-1'>
												<div className='flex justify-between items-start'>
													<div>
														<span className='font-medium text-gray-800 block'>
															{subscriber.email}
														</span>
														{subscriber.name &&
															subscriber.name !== "Unknown Name" && (
																<span className='text-xs text-gray-500'>
																	{subscriber.name}
																</span>
															)}
													</div>
													<div className='relative'>
														<button
															className='text-gray-500 p-1 rounded-full hover:bg-gray-100'
															onClick={() =>
																toggleActionMenu(subscriber._id)
															}
														>
															<Icon
																icon='mdi:dots-vertical'
																className='text-xl'
															/>
														</button>
														{actionMenuId === subscriber._id && (
															<div className='absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg overflow-hidden z-10 border border-gray-200 min-w-[150px]'>
																<button
																	className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
																	onClick={() => {
																		/* Handle view details action */
																		setActionMenuId(null);
																	}}
																>
																	<Icon
																		icon='mdi:eye'
																		className='mr-2'
																	/>
																	View Details
																</button>
																<button
																	className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-gray-700'
																	onClick={() => {
																		/* Handle edit action */
																		setActionMenuId(null);
																	}}
																>
																	<Icon
																		icon='mdi:pencil'
																		className='mr-2'
																	/>
																	Edit
																</button>
																<button
																	className='w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center text-red-600'
																	onClick={() =>
																		handleDeleteSubscriber(
																			subscriber._id
																		)
																	}
																>
																	<Icon
																		icon='mdi:delete'
																		className='mr-2'
																	/>
																	Delete
																</button>
															</div>
														)}
													</div>
												</div>
												<div className='grid grid-cols-2 gap-3 mt-3 text-xs text-gray-500'>
													<div>
														<p className='font-medium text-gray-700'>
															{subscriber.source || "Imported"}
														</p>
														<p>Source</p>
													</div>
													<div>
														<p className='font-medium text-gray-700'>
															{subscriber.createdAt
																? new Date(
																		subscriber.createdAt
																  ).toLocaleDateString("en-US", {
																		year: "numeric",
																		month: "short",
																		day: "numeric",
																  })
																: "-"}
														</p>
														<p>Date Added</p>
													</div>
													<div>
														<p
															className={`font-medium ${getEngagementColor(
																subscriber.engagementRate || 0
															)}`}
														>
															{subscriber.engagementRate || 0}%
														</p>
														<p>Engagement</p>
													</div>
													<div>
														<span
															className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
																subscriber.status || "active"
															)}`}
														>
															{subscriber.status || "Active"}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<div className='py-12 text-center'>
								<div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4'>
									<Icon
										icon='mdi:email-outline'
										className='text-3xl text-gray-400'
									/>
								</div>
								<h3 className='text-lg font-medium text-gray-900 mb-1'>
									No subscribers found
								</h3>
								<p className='text-gray-500 max-w-md mx-auto'>
									{sourceFilter || statusFilter || searchTerm
										? "Try adjusting your filters to see more results"
										: "Get started by importing your email subscribers"}
								</p>
								{!sourceFilter && !statusFilter && !searchTerm && (
									<button
										onClick={handleToggleImportModal}
										className='mt-4 bg-primary-orange text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-orange/90 transition-colors flex items-center justify-center mx-auto'
									>
										<Icon icon='mdi:upload' className='mr-1' />
										Import Subscribers
									</button>
								)}
							</div>
						)}
					</div>

					{/* Pagination */}
					{filteredSubscribers.length > 0 && (
						<div className='flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6'>
							<div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
								<div>
									<p className='text-sm text-gray-700'>
										Showing <span className='font-medium'>1</span> to{" "}
										<span className='font-medium'>
											{filteredSubscribers.length}
										</span>{" "}
										of{" "}
										<span className='font-medium'>
											{pagination.totalSubscribers}
										</span>{" "}
										results
									</p>
								</div>
								<div>
									<nav
										className='isolate inline-flex -space-x-px rounded-md shadow-sm'
										aria-label='Pagination'
									>
										<button className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
											<span className='sr-only'>Previous</span>
											<Icon
												icon='mdi:chevron-left'
												className='h-5 w-5'
												aria-hidden='true'
											/>
										</button>
										<button
											aria-current='page'
											className='relative z-10 inline-flex items-center bg-primary-orange px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orange'
										>
											{pagination.currentPage}
										</button>
										<button className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'>
											<span className='sr-only'>Next</span>
											<Icon
												icon='mdi:chevron-right'
												className='h-5 w-5'
												aria-hidden='true'
											/>
										</button>
									</nav>
								</div>
							</div>
							{/* Mobile pagination */}
							<div className='flex sm:hidden items-center justify-between w-full'>
								<button className='relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
									Previous
								</button>
								<p className='text-sm text-gray-700'>
									Page{" "}
									<span className='font-medium'>
										{pagination.currentPage}
									</span>{" "}
									of{" "}
									<span className='font-medium'>
										{pagination.totalPages || 1}
									</span>
								</p>
								<button className='relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
									Next
								</button>
							</div>
						</div>
					)}
				</div>

				{/* Stats Cards */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
					<div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
						<div className='flex items-center justify-between mb-2'>
							<h3 className='text-sm font-medium text-gray-500'>
								Total Subscribers
							</h3>
							<div className='p-2 bg-blue-50 rounded-full'>
								<Icon
									icon='mdi:account-multiple'
									className='text-blue-500 text-xl'
								/>
							</div>
						</div>
						<p className='text-2xl font-bold'>
							{pagination.totalSubscribers}
						</p>
						<div className='flex items-center mt-2 text-xs text-green-600'>
							<Icon icon='mdi:arrow-up' className='mr-1' />
							<span>New subscribers</span>
						</div>
					</div>

					<div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
						<div className='flex items-center justify-between mb-2'>
							<h3 className='text-sm font-medium text-gray-500'>
								Active Subscribers
							</h3>
							<div className='p-2 bg-green-50 rounded-full'>
								<Icon
									icon='mdi:account-check'
									className='text-green-500 text-xl'
								/>
							</div>
						</div>
						<p className='text-2xl font-bold'>
							{
								subscribers.filter(
									(sub) => sub.status?.toLowerCase() === "active"
								).length
							}
						</p>
						<div className='flex items-center mt-2 text-xs text-green-600'>
							<Icon icon='mdi:arrow-up' className='mr-1' />
							<span>Actively engaged</span>
						</div>
					</div>

					<div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
						<div className='flex items-center justify-between mb-2'>
							<h3 className='text-sm font-medium text-gray-500'>
								Average Engagement
							</h3>
							<div className='p-2 bg-purple-50 rounded-full'>
								<Icon
									icon='mdi:chart-line'
									className='text-purple-500 text-xl'
								/>
							</div>
						</div>
						<p className='text-2xl font-bold'>
							{subscribers.length > 0
								? Math.round(
										subscribers.reduce(
											(acc, sub) => acc + (sub.engagementRate || 0),
											0
										) / subscribers.length
								  )
								: 0}
							%
						</p>
						<div className='flex items-center mt-2 text-xs text-gray-600'>
							<Icon icon='mdi:information' className='mr-1' />
							<span>Overall rate</span>
						</div>
					</div>

					<div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
						<div className='flex items-center justify-between mb-2'>
							<h3 className='text-sm font-medium text-gray-500'>
								Imported Today
							</h3>
							<div className='p-2 bg-orange-50 rounded-full'>
								<Icon
									icon='mdi:account-plus'
									className='text-primary-orange text-xl'
								/>
							</div>
						</div>
						<p className='text-2xl font-bold'>
							{
								subscribers.filter((sub) => {
									if (!sub.createdAt) return false;
									const today = new Date().toDateString();
									const subDate = new Date(
										sub.createdAt
									).toDateString();
									return today === subDate;
								}).length
							}
						</p>
						<div className='flex items-center mt-2 text-xs text-primary-orange'>
							<Icon icon='mdi:calendar-today' className='mr-1' />
							<span>Added today</span>
						</div>
					</div>
				</div>
				{/* Source Distribution */}
				<div className='bg-white rounded-lg shadow-sm mt-6 p-4 md:p-6'>
					<h2 className='text-lg font-semibold mb-4'>
						Subscriber Sources
					</h2>
					<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
						<div className='flex flex-col'>
							<div className='flex justify-between items-center mb-2'>
								<span className='text-sm text-gray-600'>Website</span>
								<span className='text-sm font-medium'>
									{
										subscribers.filter(
											(sub) => sub.source === "Website"
										).length
									}
								</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2.5'>
								<div
									className='bg-blue-500 h-2.5 rounded-full'
									style={{
										width: `${
											subscribers.length > 0
												? (subscribers.filter(
														(sub) => sub.source === "Website"
												  ).length /
														subscribers.length) *
												  100
												: 0
										}%`,
									}}
								></div>
							</div>
						</div>

						<div className='flex flex-col'>
							<div className='flex justify-between items-center mb-2'>
								<span className='text-sm text-gray-600'>
									Social Ads
								</span>
								<span className='text-sm font-medium'>
									{
										subscribers.filter(
											(sub) => sub.source === "Social Ads"
										).length
									}
								</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2.5'>
								<div
									className='bg-purple-500 h-2.5 rounded-full'
									style={{
										width: `${
											subscribers.length > 0
												? (subscribers.filter(
														(sub) => sub.source === "Social Ads"
												  ).length /
														subscribers.length) *
												  100
												: 0
										}%`,
									}}
								></div>
							</div>
						</div>

						<div className='flex flex-col'>
							<div className='flex justify-between items-center mb-2'>
								<span className='text-sm text-gray-600'>
									Imported
								</span>
								<span className='text-sm font-medium'>
									{
										subscribers.filter(
											(sub) =>
												sub.source === "Imported" || !sub.source
										).length
									}
								</span>
							</div>
							<div className='w-full bg-gray-200 rounded-full h-2.5'>
								<div
									className='bg-primary-orange h-2.5 rounded-full'
									style={{
										width: `${
											subscribers.length > 0
												? (subscribers.filter(
														(sub) =>
															sub.source === "Imported" || !sub.source
												  ).length /
														subscribers.length) *
												  100
												: 0
										}%`,
									}}
								></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default EmailSubscribers;
