/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p1: 'var(--p1)',
        secondary: 'var(--secondary)',
        p1font: 'var(--p1font)',
        bordercolor: 'var(--bordercolor)',
      },
    },
  },
  plugins: [],
}
