/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F7A420",
        supportivePrimary: "#E69B23",
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

