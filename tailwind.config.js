/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        montserrat100: 100,
        montserrat200: 200,
        montserrat300: 300,
        montserrat400: 400,
        montserrat500: 500,
        montserrat600: 600,
        montserrat700: 700,
        montserrat800: 800,
        montserrat900: 900,
      },
      colors: {
        'gradient-start': '#D44B0C', // Starting color of the gradient
        'gradient-end': '#C68C34',   // Ending color of the gradient
      },
      fontFamily: {
        'oc-pajaro': ['"OC Pajaro Regular"', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'], // Define your custom font
      },
      colors:{
        'main': '#4552e3',
      }

    },
  },
  plugins: [],
}