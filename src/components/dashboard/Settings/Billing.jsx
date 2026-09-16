import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import useStore from "../../../state/store";
import { listTransactions, listPlans } from "../../../functions/paymentFunctions";
import { useAuth } from "../../../context/UseAuth";

const Billing = () => {
	const { user } = useAuth();
	const { billingInfo, fetchBillingInfo } = useStore();
	const [transactions, setTransactions] = useState([]);
	const [plans, setPlans] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAll = async () => {
			try {
				setLoading(true);
				setError(null);

				const orgId =
					user?.organizationId || user?.orgId || user?.organization?._id;

				const promises = [listTransactions(), listPlans()];
				if (orgId) promises.push(fetchBillingInfo(orgId));

				const [txData, plansData] = await Promise.allSettled(promises);

				if (txData.status === "fulfilled") {
					const txList =
						txData.value?.data?.transactions ||
						txData.value?.transactions ||
						txData.value ||
						[];
					setTransactions(Array.isArray(txList) ? txList : []);
				}
				if (plansData.status === "fulfilled") {
					const planList =
						plansData.value?.data?.plans ||
						plansData.value?.plans ||
						plansData.value ||
						[];
					setPlans(Array.isArray(planList) ? planList : []);
				}
			} catch (err) {
				console.error("Billing fetch error:", err);
				setError("Could not load billing information.");
			} finally {
				setLoading(false);
			}
		};

		fetchAll();
	}, [user]);

	const billing = billingInfo?.subscription || billingInfo || null;

	const formatCurrency = (amount, currency = "NGN") => {
		try {
			return new Intl.NumberFormat("en-NG", {
				style: "currency",
				currency,
			}).format(amount / 100); // Paystack amounts are in kobo
		} catch {
			return `${currency} ${amount}`;
		}
	};

	const formatDate = (dateStr) => {
		if (!dateStr) return "—";
		return new Date(dateStr).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	if (loading) {
		return (
			<div className='p-6 md:p-8 max-w-4xl flex items-center gap-3'>
				<Icon
					icon='mdi:loading'
					className='text-2xl text-blue-500 animate-spin'
				/>
				<span className='text-gray-600'>Loading billing information...</span>
			</div>
		);
	}

	return (
		<div className='p-6 md:p-8 max-w-4xl'>
			<div className='flex items-center gap-3 mb-6'>
				<Icon icon='mdi:credit-card' className='text-2xl text-blue-600' />
				<h1 className='text-2xl font-bold text-gray-800'>Billing</h1>
			</div>

			{error && (
				<div className='mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center gap-2 text-sm'>
					<Icon icon='mdi:alert-circle' />
					<span>{error}</span>
				</div>
			)}

			<div className='space-y-6'>
				{/* Current Plan */}
				<div className='bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white'>
					<div className='flex items-center justify-between mb-4'>
						<div>
							<h2 className='text-2xl font-bold'>
								{billing?.plan || billing?.planName || "Free"} Plan
							</h2>
							<p className='text-blue-100 mt-1'>
								{billing?.interval || billing?.billingCycle || "—"} Billing
							</p>
						</div>
						<Icon icon='mdi:crown' className='text-5xl text-yellow-300' />
					</div>
					<div className='flex items-center justify-between mt-6 pt-4 border-t border-white/20'>
						<span>
							Next billing:{" "}
							{formatDate(
								billing?.nextBillingDate || billing?.next_payment_date
							)}
						</span>
						<button className='bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors'>
							Manage Plan
						</button>
					</div>
				</div>

				{/* Available Plans */}
				{plans.length > 0 && (
					<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
						<h3 className='text-lg font-semibold text-gray-800 mb-4'>
							Available Plans
						</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							{plans.map((plan, i) => (
								<div
									key={plan._id || plan.id || i}
									className='border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors'
								>
									<p className='font-semibold text-gray-800'>
										{plan.name || plan.planName}
									</p>
									<p className='text-sm text-gray-500 mt-1'>
										{plan.interval || plan.billingCycle}
									</p>
									<p className='text-lg font-bold text-blue-600 mt-2'>
										{plan.amount !== undefined
											? formatCurrency(plan.amount, plan.currency)
											: "—"}
									</p>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Payment Method */}
				{billing?.authorization && (
					<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
						<h3 className='text-lg font-semibold text-gray-800 mb-4'>
							Payment Method
						</h3>
						<div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg'>
							<div className='flex items-center gap-4'>
								<Icon icon='mdi:credit-card' className='text-3xl text-gray-400' />
								<div>
									<p className='font-medium text-gray-800'>
										•••• •••• •••• {billing.authorization.last4}
									</p>
									<p className='text-sm text-gray-500'>
										{billing.authorization.card_type} · Expires{" "}
										{billing.authorization.exp_month}/
										{billing.authorization.exp_year}
									</p>
								</div>
							</div>
							<button className='text-blue-600 hover:text-blue-700 font-medium'>
								Update
							</button>
						</div>
					</div>
				)}

				{/* Billing / Transaction History */}
				<div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
					<h3 className='text-lg font-semibold text-gray-800 mb-4'>
						Billing History
					</h3>
					{transactions.length === 0 ? (
						<p className='text-sm text-gray-500 text-center py-4'>
							No transactions yet.
						</p>
					) : (
						<div className='space-y-3'>
							{transactions.slice(0, 10).map((tx, i) => (
								<div
									key={tx._id || tx.id || i}
									className='flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors'
								>
									<div>
										<p className='font-medium text-gray-800'>
											{tx.description || tx.plan || "Payment"}
										</p>
										<p className='text-sm text-gray-500'>
											{formatDate(tx.createdAt || tx.created_at || tx.date)}
										</p>
									</div>
									<div className='text-right'>
										<p className='font-semibold text-gray-800'>
											{formatCurrency(tx.amount, tx.currency)}
										</p>
										<span
											className={`text-xs font-medium px-2 py-0.5 rounded-full ${
												tx.status === "success"
													? "bg-green-100 text-green-700"
													: "bg-yellow-100 text-yellow-700"
											}`}
										>
											{tx.status}
										</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Billing;
