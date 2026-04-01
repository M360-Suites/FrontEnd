import { ss, s1, s2 } from "../../assets";
import { Icon } from "@iconify/react/dist/iconify.js";

const Extras = () => {
	const emaildata = [
		{ id: 1, des: "Generate data for leads" },
		{ id: 2, des: "Send personalized email campaigns" },
		{ id: 3, des: "Track open rates and click-throughs" },
		{ id: 4, des: "Automate follow-up sequences" },
	];

	return (
		<section className='px-4 md:px-64 py-12'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-5 items-center'>
				{/* Text Section */}
				<div className='flex flex-col gap-6 text-center lg:text-left'>
					<h2 className='text-2xl md:text-4xl md:max-w-3xl font-semibold text-primary-orange'>
						Everything You Need to Automate and Scale Your Marketing
					</h2>

					<div className='flex flex-col gap-4'>
						{emaildata.map((item) => (
							<div key={item.id} className='flex items-start gap-3'>
								<div className='rounded-full border border-primary-orange flex items-center justify-center h-6 w-6 shrink-0'>
									<Icon
										icon='mingcute:check-line'
										className='h-4 w-4 text-primary-orange'
									/>
								</div>
								<span className='text-sm md:text-base'>
									{item.des}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Image Section */}
				<div className='flex flex-col items-center gap-6'>
					<img
						src={s2}
						alt=''
						className='w-40 md:w-48 object-contain'
					/>
					<img
						src={ss}
						alt='dashboard preview'
						className='w-full max-w-md object-cover rounded-lg shadow-sm'
					/>
					<img
						src={s1}
						alt=''
						className='w-40 md:w-48 object-contain'
					/>
				</div>
			</div>
		</section>
	);
};

export default Extras;
