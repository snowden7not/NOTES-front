/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      //color i am using here
      colors: {
        primary: "#F44336",
        secondary: "#d7362b",
      },
    },
  },
  plugins: [],
}

