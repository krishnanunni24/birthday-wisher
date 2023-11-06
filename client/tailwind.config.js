/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        background:"#330072" ,//persian indigo
        secondary:"#e7b464",
        navbar:"#330072"
      }
    },
  },
  plugins: [],
};
