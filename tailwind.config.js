/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#0A0A0A',
          fg: '#F3F3F3',
        },
        accent: '#FF3366',
        muted: '#888888',
        border: '#222222',
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'], // Body Text
        display: ['Nohemi', 'sans-serif'], // Headings
      },
      fontSize: {
        'hero': 'clamp(4rem, 10vw, 12rem)',
        'h2': 'clamp(2rem, 5vw, 5rem)',
        'body-lg': 'clamp(1.125rem, 2vw, 1.5rem)',
        'body': '1rem',
        'meta': '0.875rem',
      },
      spacing: {
        'section': 'clamp(4rem, 10vh, 8rem)',
      },
    },
  },
  plugins: [],
}
