/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sif-green': {
          DEFAULT: '#00BF63',
          400: '#39E78F',
        },
        'sif-light-green': '#58E8A3',
      },
    },
  },
  plugins: [],
}
