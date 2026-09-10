import { useState } from "react";
import useStore from "../../../state/store";
import { useAuth } from "../../../context/UseAuth";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

const AccountProfile = () => {
	const { user } = useAuth();
	const { settings, updateSettings } = useStore();
	
	const [formData, setFormData] = useState({
		name: user?.user?.name || user?.user?.companyName || settings.account.companyName || "",
		email: user?.user?.email || settings.account.email || "",
		phoneNumber1: settings.account.phoneNumber1 || "",
		phoneNumber2: settings.account.phoneNumber2 || "",
		address: settings.account.address || "",
		city: settings.account.city || "",
		country: settings.account.country || "Nigeria",
	});
	
	const [isLoading, setIsLoading] = useState(false);

	const countries = [
		{ name: "Nigeria", code: "NG", flag: "🇳🇬", dialCode: "+234" },
		{ name: "United States", code: "US", flag: "🇺🇸", dialCode: "+1" },
		{
			name: "United Kingdom",
			code: "GB",
			flag: "🇬🇧",
			dialCode: "+44",
		},
		{ name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1" },
	];

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const result = await updateSettings("account", formData);
			if (result.success) {
				toast.success("Profile updated successfully!");
			}
		} catch (error) {
			toast.error("Failed to update profile");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-3'>
					<Icon
						icon='mdi:account'
						className='text-2xl text-blue-600'
					/>
					<h1 className='text-2xl font-bold text-gray-800'>
						Account & Profile
					</h1>
				</div>
				<button
					onClick={handleSave}
					disabled={isLoading}
					className='flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50'
				>
					{isLoading ? (
						<>
							<Icon icon='eos-icons:loading' className='text-lg' />
							Saving...
						</>
					) : (
						<>
							<Icon icon='mdi:content-save' className='text-lg' />
							Save Changes
						</>
					)}
				</button>
			</div>

			<div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8'>

				{/* Account Information */}
				<div>
					<div className='flex items-center gap-3 mb-6'>
						<Icon
							icon='mdi:card-account-details-outline'
							className='text-blue-600 text-xl'
						/>
						<h2 className='text-lg font-semibold text-gray-800'>
							Account Details
						</h2>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Account Name
							</label>
							<div className='relative'>
								<input
									type='text'
									value={formData.name}
									onChange={(e) =>
										handleChange("name", e.target.value)
									}
									className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
								<Icon
									icon='mdi:pencil'
									className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
								/>
							</div>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Email
							</label>
							<input
								type='email'
								value={formData.email}
								onChange={(e) =>
									handleChange("email", e.target.value)
								}
								className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
						</div>
					</div>
				</div>

				{/* Phone Numbers */}
				<div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Phone Number 1
							</label>
							<div className='flex gap-2'>
								<select className='px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
									<option>🇳🇬 +234</option>
									<option>🇺🇸 +1</option>
									<option>🇬🇧 +44</option>
								</select>
								<div className='relative flex-1'>
									<input
										type='tel'
										value={formData.phoneNumber1}
										onChange={(e) =>
											handleChange("phoneNumber1", e.target.value)
										}
										className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
									<Icon
										icon='mdi:pencil'
										className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
									/>
								</div>
							</div>
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700 mb-2'>
								Phone Number 2{" "}
								<span className='text-blue-600 text-xs'>
									optional*
								</span>
							</label>
							<div className='flex gap-2'>
								<select className='px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'>
									<option>🇳🇬 +234</option>
									<option>🇺🇸 +1</option>
									<option>🇬🇧 +44</option>
								</select>
								<div className='relative flex-1'>
									<input
										type='tel'
										value={formData.phoneNumber2}
										onChange={(e) =>
											handleChange("phoneNumber2", e.target.value)
										}
										className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
									/>
									<Icon
										icon='mdi:pencil'
										className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Address */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Address
					</label>
					<div className='relative'>
						<input
							type='text'
							value={formData.address}
							onChange={(e) =>
								handleChange("address", e.target.value)
							}
							className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						/>
						<Icon
							icon='mdi:pencil'
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
						/>
					</div>
				</div>

				{/* City and Country */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							City
						</label>
						<div className='relative'>
							<input
								type='text'
								value={formData.city}
								onChange={(e) => handleChange("city", e.target.value)}
								className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
							/>
							<Icon
								icon='mdi:pencil'
								className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
							/>
						</div>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700 mb-2'>
							Country
						</label>
						<div className='flex gap-2'>
							<div className='px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50'>
								🇳🇬
							</div>
							<div className='relative flex-1'>
								<input
									type='text'
									value={formData.country}
									onChange={(e) =>
										handleChange("country", e.target.value)
									}
									className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
								/>
								<Icon
									icon='mdi:pencil'
									className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountProfile;
