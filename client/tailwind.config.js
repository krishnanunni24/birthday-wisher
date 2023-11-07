/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        background:"#330072" ,//persian indigo
        background2:"#5a00c9",
        secondary:"#e7b464",
        navbar:"#330072"
      }
    },
  },
  plugins: [],
};
