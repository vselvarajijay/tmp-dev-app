/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1a202c',    // Dark blue-gray
          secondary: '#2d3748',  // Slightly lighter blue-gray
          accent: '#e53e3e',     // A vibrant red accent
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],  // Custom sans-serif font
        },
        spacing: {
          '128': '32rem',  // Example custom spacing value
        },
      },
    },
    plugins: [],
  }
  