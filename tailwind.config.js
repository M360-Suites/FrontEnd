/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-orange": "#03045e",
				"light-orange": "#7cd2ff",
			},
			backgroundImage: {
				"orange-gradient":
					"linear-gradient(to right, #3739f9, #5b5dfb)",
				"orange-gradient-vertical":
					"linear-gradient(to bottom, #3739f9, #5b5dfb)",
				"orange-gradient-diagonal":
					"linear-gradient(to bottom right, #3739f9, #5b5dfb)",
				"orange-gradient-tri":
					"linear-gradient(to right, #3739f9, #5b5dfb, #7d7ffc)",
				"orange-gradient-radial":
					"radial-gradient(circle, #3739f9, #5b5dfb)",
			},
			textFillColor: {
				transparent: "transparent",
			},
			backgroundClip: {
				text: "text",
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				".text-gradient-orange": {
					background: "linear-gradient(to right, #3739f9, #5b5dfb)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"background-clip": "text",
					"text-fill-color": "transparent",
				},
				".text-gradient-orange-vertical": {
					background: "linear-gradient(to bottom, #3739f9, #5b5dfb)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"background-clip": "text",
					"text-fill-color": "transparent",
				},
				".text-gradient-orange-diagonal": {
					background:
						"linear-gradient(to bottom right, #3739f9, #5b5dfb)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"background-clip": "text",
					"text-fill-color": "transparent",
				},
				".text-gradient-orange-blue": {
					background:
						"linear-gradient(to right, #3739f9, #5b5dfb, #4F46E5)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"background-clip": "text",
					"text-fill-color": "transparent",
				},
				".text-gradient-orange-purple": {
					background:
						"linear-gradient(to right, #3739f9, #5b5dfb, #A855F7)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"background-clip": "text",
					"text-fill-color": "transparent",
				},
				".text-gradient-sunset": {
					background:
						"linear-gradient(to right, #3739f9, #5b5dfb, #FFC107)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"background-clip": "text",
					"text-fill-color": "transparent",
				},
				".text-gradient-fire": {
					background:
						"linear-gradient(to right, #3739f9, #4F46E5, #6366F1)",
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
					"background-clip": "text",
					"text-fill-color": "transparent",
				},
			};
			addUtilities(newUtilities, ["responsive", "hover"]);
		},
	],
};
