/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[class~="theme-dark"]'],
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        glass: {
          light: '#A7EBF2',
          primary: '#54AEBF',
          secondary: '#26658C',
          dark: '#023859',
          darkest: '#011C40',
        }
      },
      boxShadow: {
        neu: '8px 8px 16px #cfd8df, -8px -8px 16px #ffffff',
      },
    },
  },
  plugins: [],
}
