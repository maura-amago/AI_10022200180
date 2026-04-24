/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ghana: {
          green: '#006B3F',
          yellow: '#FCD116',
          red: '#CE1126'
        }
      }
    },
  },
  plugins: [],
}
