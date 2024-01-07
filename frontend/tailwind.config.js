/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'saffron': '#E6B710',
        'darkbrown': '#5A2C0D',
        'offwhite': '#F0EEED'
      },
      textColor: {
        'saffron': '#E6B710',
        'darkbrown': '#5A2C0D',
        'offwhite': '#F0EEED'
      }
    },
  },
  plugins: [],
}