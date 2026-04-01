import { Icon } from "@iconify/react";
import useStore from "../../../state/store";

const Billing = () => {
	const { settings } = useStore();
	const { billing } = settings;

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center gap-3 mb-6'>
				<Icon
					icon='mdi:credit-card'
					className='text-2xl text-blue-600'
				/>
				<h1 className='text-2xl font-bold text-gray-800'>Billing</h1>
			</div>

			<div className='space-y-6'>
				{/* Current Plan */}
				<div className='bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white'>
					<div className='flex items-center justify-between mb-4'>
						<div>
							<h2 className='text-2xl font-bold'>
								{billing.plan} Plan
							</h2>
							<p className='text-blue-100 mt-1'>
								{billing.billingCycle} Billing
							</p>
						</div>
						<Icon
							icon='mdi:crown'
							className='text-5xl text-yellow-300'
						/>
					</div>
					<div className='flex items-center justify-between mt-6 pt-4 border-t border-white/20'>
						<span>Next billing date: {billing.nextBillingDate}</span>
						<button className='bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors'>
							Manage Plan
						</button>
					</div>
				</div>

				{/* Payment Method */}
				<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
					<h3 className='text-lg font-semibold text-gray-800 mb-4'>
						Payment Method
					</h3>
					<div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
						<div className='flex items-center gap-4'>
							<Icon
								icon='mdi:credit-card'
								className='text-3xl text-gray-400'
							/>
							<div>
								<p className='font-medium text-gray-800'>
									•••• •••• •••• {billing.cardLast4}
								</p>
								<p className='text-sm text-gray-500'>Expires 12/25</p>
							</div>
						</div>
						<button className='text-blue-600 hover:text-blue-700 font-medium'>
							Update
						</button>
					</div>
				</div>

				{/* Billing History */}
				<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
					<h3 className='text-lg font-semibold text-gray-800 mb-4'>
						Billing History
					</h3>
					<div className='space-y-3'>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className='flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors'
							>
								<div>
									<p className='font-medium text-gray-800'>
										Premium Plan - Monthly
									</p>
									<p className='text-sm text-gray-500'>
										Jan {i}, 2026
									</p>
								</div>
								<div className='text-right'>
									<p className='font-semibold text-gray-800'>
										$49.99
									</p>
									<button className='text-sm text-blue-600 hover:text-blue-700'>
										Download
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Billing;
