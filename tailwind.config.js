/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**/*.{js,jsx,ts,tsx}',   
    './app/**/*.{js,jsx,ts,tsx}',  
    './public/**/*.html',          
    './components/**/*.{js,jsx,ts,tsx}'], 
  theme: {
    extend: {
      colors: {
        'primary-blue': '#1e40af',   
        'light-blue': '#3b82f6',     
        'dark-blue': '#1e3a8a',    
      },
    },
  },
  plugins: [],
}

