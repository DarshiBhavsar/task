/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'ipad-pro': { 'raw': '(max-width: 1024px) and (max-height: 1366)' },
        'nest-hub': { 'raw': '(max-width: 1024px) and (max-height: 600px)' },
      }
    },
  },
  plugins: [],
}

