/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,md,mdx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './theme.config.tsx'
    ],
    theme: {
      extend: {}
    },
    plugins: [],
    darkMode: 'class'
  }