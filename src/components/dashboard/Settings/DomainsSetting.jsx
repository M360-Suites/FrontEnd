import { useState } from "react";
import { Icon } from "@iconify/react";
import useStore from "../../../state/store";
import { toast } from "sonner";

const DomainsSetting = () => {
	const { settings, updateSettings } = useStore();
	const [domains, setDomains] = useState(settings.domains || []);
	const [newDomain, setNewDomain] = useState("");
	const [isAdding, setIsAdding] = useState(false);

	const handleAddDomain = async () => {
		if (!newDomain.trim()) {
			toast.error("Please enter a domain");
			return;
		}
		setIsAdding(true);
		const updatedDomains = [
			...domains,
			{
				domain: newDomain,
				verified: false,
				addedAt: new Date().toISOString(),
			},
		];
		await updateSettings("domains", updatedDomains);
		setDomains(updatedDomains);
		setNewDomain("");
		setIsAdding(false);
		toast.success("Domain added successfully");
	};

	const handleRemoveDomain = async (index) => {
		const updatedDomains = domains.filter((_, i) => i !== index);
		await updateSettings("domains", updatedDomains);
		setDomains(updatedDomains);
		toast.success("Domain removed");
	};

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center gap-3 mb-6'>
				<Icon icon='mdi:web' className='text-2xl text-blue-600' />
				<h1 className='text-2xl font-bold text-gray-800'>
					Domains Setting
				</h1>
			</div>

			<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
				<div className='flex gap-3 mb-6'>
					<input
						type='text'
						value={newDomain}
						onChange={(e) => setNewDomain(e.target.value)}
						placeholder='Enter domain (e.g., example.com)'
						className='flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
					/>
					<button
						onClick={handleAddDomain}
						disabled={isAdding}
						className='bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-50'
					>
						{isAdding ? "Adding..." : "Add Domain"}
					</button>
				</div>

				<div className='space-y-3'>
					{domains.length === 0 ? (
						<div className='text-center py-12 text-gray-500'>
							<Icon
								icon='mdi:web'
								className='text-6xl mx-auto mb-4 text-gray-300'
							/>
							<p>No domains added yet</p>
						</div>
					) : (
						domains.map((domain, index) => (
							<div
								key={index}
								className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'
							>
								<div className='flex items-center gap-3'>
									<Icon
										icon='mdi:web'
										className='text-2xl text-blue-600'
									/>
									<div>
										<p className='font-medium text-gray-800'>
											{domain.domain}
										</p>
										<p className='text-sm text-gray-500'>
											{domain.verified ? (
												<span className='text-green-600 flex items-center gap-1'>
													<Icon icon='mdi:check-circle' /> Verified
												</span>
											) : (
												<span className='text-orange-600'>
													Pending verification
												</span>
											)}
										</p>
									</div>
								</div>
								<button
									onClick={() => handleRemoveDomain(index)}
									className='text-red-600 hover:text-red-700'
								>
									<Icon icon='mdi:delete' className='text-xl' />
								</button>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default DomainsSetting;
