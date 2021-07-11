module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
  theme: {
    extend: {},
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%'
    },
    minWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%'
    }
  },
  variants: {
    extend: {
      opacity: ['group-hover']
    }
  },
  plugins: []
};
