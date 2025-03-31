/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-orange": "#FF5C02",
        "light-orange": "#FF9256",
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(to right, #FF5C02, #FF9256)",
        "orange-gradient-vertical":
          "linear-gradient(to bottom, #FF5C02, #FF9256)",
        "orange-gradient-diagonal":
          "linear-gradient(to bottom right, #FF5C02, #FF9256)",
        "orange-gradient-tri":
          "linear-gradient(to right, #FF5C02, #FF9256, #FFB38A)",
        "orange-gradient-radial":
          "radial-gradient(circle, #FF5C02, #FF9256)",
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
          background: "linear-gradient(to right, #FF5C02, #FF9256)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          "text-fill-color": "transparent",
        },
        ".text-gradient-orange-vertical": {
          background: "linear-gradient(to bottom, #FF5C02, #FF9256)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          "text-fill-color": "transparent",
        },
        ".text-gradient-orange-diagonal": {
          background: "linear-gradient(to bottom right, #FF5C02, #FF9256)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          "text-fill-color": "transparent",
        },
        ".text-gradient-orange-blue": {
          background:
            "linear-gradient(to right, #FF5C02, #FF9256, #4F46E5)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          "text-fill-color": "transparent",
        },
        ".text-gradient-orange-purple": {
          background:
            "linear-gradient(to right, #FF5C02, #FF9256, #A855F7)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          "text-fill-color": "transparent",
        },
        ".text-gradient-sunset": {
          background:
            "linear-gradient(to right, #FF5C02, #FF9256, #FFC107)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          "text-fill-color": "transparent",
        },
        ".text-gradient-fire": {
          background:
            "linear-gradient(to right, #FF5C02, #FF4500, #FF0000)",
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
