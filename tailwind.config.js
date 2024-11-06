/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        popppins: "'Poppins', sans-serif;",
        edu: "'Edu AU VIC WA NT Dots', cursive",
      },
    },
  },
  plugins: [require("daisyui")],
};
