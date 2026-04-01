import { fb, ig, ga, x, meta, yt, li, tt } from "../../assets";

const Connect = () => {
	const images = [fb, ig, ga, x, meta, yt, li, tt];
	return (
		<div className='flex justify-center items-center h-auto flex-col gap-5 mx-auto mt-4 border border-gray-400 rounded-2xl p-5 max-w-4xl'>
			<p>CONNECT ALL YOUR SOCIALS TO ONE PLATFORM</p>

			<div className='flex justify-between items-center gap-3'>
				{images.map((img, index) => (
					<div key={index} className='p-2'>
						<img
							src={img}
							alt={`social-${index}`}
							className='h-auto w-auto object-cover'
						/>
					</div>
				))}
			</div>
		</div>
	);
};
export default Connect;
