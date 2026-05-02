/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blood: {
          600: '#991b1b', 
          700: '#7f1d1d', 
          900: '#450a0a', 
        },
        dark: {
          900: '#0a0a0a', 
          800: '#1a1a1a', 
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'], 
        mono: ['Courier Prime', 'monospace'], 
      }
    },
  },
  plugins: [],
}