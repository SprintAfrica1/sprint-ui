// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sprint: {
          navy: '#001F3F',
          yellow: '#FFD700',
          blue: '#0056B3',
          success: '#2ECC71',
          error: '#E74C3C',
          gray: '#F8F9FA',
        }
      },
      boxShadow: {
        '3d': '0 10px 40px -10px rgba(0, 31, 63, 0.3)', // Custom HD shadow
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}