/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        'theme-purple-100': '#5B86E599',
        'theme-purple': '#5B86E5',
        'theme-bg-primary': '#a7bcff',
        'theme-bg-secondary': '#3e3c61',
        'theme-bg-secondary-bold': '#2f2d52'
      }
    }
  },
  plugins: []
};
