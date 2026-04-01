import { useState } from "react";
import useStore from "../../../state/store";
import { toast } from "sonner";
import { Icon } from "@iconify/react";

const GeneralSettings = () => {
	const { settings, updateSettings } = useStore();
	const [formData, setFormData] = useState(settings.general);
	const [isLoading, setIsLoading] = useState(false);

	const languages = [
		"English",
		"Spanish",
		"French",
		"German",
		"Chinese",
		"Arabic",
	];
	const timezones = [
		"GMT -12",
		"GMT -11",
		"GMT -10",
		"GMT -5",
		"GMT +0",
		"GMT +1",
		"GMT +2",
		"GMT +5",
		"GMT +8",
	];
	const currencies = ["USD", "EUR", "GBP", "NGN", "JPY", "CNY"];
	const dateFormats = [
		"dd/mm/yy",
		"mm/dd/yy",
		"yyyy-mm-dd",
		"dd-mm-yyyy",
	];

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		setIsLoading(true);
		try {
			const result = await updateSettings("general", formData);
			if (result.success) {
				toast.success("Settings saved successfully!");
			}
		} catch (error) {
			toast.error("Failed to save settings");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center justify-between mb-6'>
				<div className='flex items-center gap-3'>
					<Icon
						icon='material-symbols:settings'
						className='text-2xl text-blue-600'
					/>
					<h1 className='text-2xl font-bold text-gray-800'>
						General Settings
					</h1>
				</div>
				<button
					onClick={handleSave}
					disabled={isLoading}
					className='flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
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

			<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6'>
				{/* Platform Language */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Platform language
					</label>
					<p className='text-sm text-gray-500 mb-3'>
						Select your preferred language
					</p>
					<div className='relative'>
						<select
							value={formData.language}
							onChange={(e) =>
								handleChange("language", e.target.value)
							}
							className='w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white'
						>
							{languages.map((lang) => (
								<option key={lang} value={lang}>
									{lang}
								</option>
							))}
						</select>
						<Icon
							icon='mdi:chevron-down'
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
						/>
					</div>
				</div>

				{/* Time Zone */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Set Time Zone
					</label>
					<p className='text-sm text-gray-500 mb-3'>
						Set your timezone
					</p>
					<div className='relative'>
						<select
							value={formData.timezone}
							onChange={(e) =>
								handleChange("timezone", e.target.value)
							}
							className='w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white'
						>
							{timezones.map((tz) => (
								<option key={tz} value={tz}>
									{tz}
								</option>
							))}
						</select>
						<Icon
							icon='mdi:chevron-down'
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
						/>
					</div>
				</div>

				{/* Currency */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Set Currency
					</label>
					<p className='text-sm text-gray-500 mb-3'>
						Set currency for billing purpose
					</p>
					<div className='relative'>
						<select
							value={formData.currency}
							onChange={(e) =>
								handleChange("currency", e.target.value)
							}
							className='w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white'
						>
							{currencies.map((curr) => (
								<option key={curr} value={curr}>
									{curr}
								</option>
							))}
						</select>
						<Icon
							icon='mdi:chevron-down'
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
						/>
					</div>
				</div>

				{/* Date Format */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						Set Date format
					</label>
					<p className='text-sm text-gray-500 mb-3'>
						Set preferred date format
					</p>
					<div className='relative'>
						<select
							value={formData.dateFormat}
							onChange={(e) =>
								handleChange("dateFormat", e.target.value)
							}
							className='w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white'
						>
							{dateFormats.map((format) => (
								<option key={format} value={format}>
									{format}
								</option>
							))}
						</select>
						<Icon
							icon='mdi:chevron-down'
							className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GeneralSettings;
