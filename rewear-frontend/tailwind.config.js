/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // ✅ Global font
      },
      colors: {
        dark: {
          DEFAULT: "#0D0D12",
          lighter: "#1A1A1F",
        },
        purpleAccent: "#8b5cf6",
        purpleHover: "#7c3aed",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
    },
  },
  plugins: [],
};
