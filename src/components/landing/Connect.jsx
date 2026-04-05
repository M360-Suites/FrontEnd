import { motion } from "framer-motion";
import { fb, ig, ga, x, meta, yt, li, tt } from "../../assets";

const Connect = () => {
	const images = [fb, ig, ga, x, meta, yt, li, tt];
	// Duplicate the array to create a seamless seamless loop
	const marqueeImages = [...images, ...images, ...images];

	return (
		<div className='py-16 overflow-hidden bg-gray-50 flex flex-col items-center justify-center border-y border-gray-100'>
			<motion.div 
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="text-center mb-8"
			>
				<p className='text-sm font-bold tracking-widest text-gray-500 uppercase mb-2'>Seamless Integrations</p>
				<h2 className="text-xl md:text-2xl font-bold text-primary-orange">Connect All Your Socials to One Platform</h2>
			</motion.div>

			<div className='w-full max-w-[1200px] relative overflow-hidden flex' style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
				<motion.div
					animate={{ x: ["0%", "-50%"] }}
					transition={{ ease: "linear", duration: 25, repeat: Infinity }}
					className='flex items-center gap-10 md:gap-16 pr-10 md:pr-16 w-max'
				>
					{marqueeImages.map((img, index) => (
						<div key={index} className='w-20 md:w-28 h-20 md:h-28 flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:scale-105 cursor-pointer'>
							<img
								src={img}
								alt={`social-${index}`}
								className='h-full w-full object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100'
							/>
						</div>
					))}
				</motion.div>
			</div>
		</div>
	);
};

export default Connect;
