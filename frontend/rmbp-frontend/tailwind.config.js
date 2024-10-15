/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
<<<<<<< HEAD
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
=======
    colors: {
      background : '#3c3c3c',
      fonts: '#ffecc8',
      olive: '#004a4f',
      lightgreen: '#00ff44',
      red: '#ff6666',

    },
    extend: {},
>>>>>>> dfde2d2f9c7b4a2066849b79435b2c0ead4318d4
  },
  plugins: [],
}