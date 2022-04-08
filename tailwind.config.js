module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-brand': '#26A1FF',
        'blue-start': '#2FBEFF',
        'blue-end': '#2395FF',
        'blue-dark': '#022F59',
        orange: '#FFCB30',
        offWhite: '#EBEDF7',
        'gray-brand': '#5E656F',
        'gray-light': '#9ca5b4',
      },
      fontFamily: {
        title: ['Blinker', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
      },
      fontSize: {
        xxs: '11px',
        xs: '12px',
        sm: '13px',
        base: '14px',
        md: '15px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
