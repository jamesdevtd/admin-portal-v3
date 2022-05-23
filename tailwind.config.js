module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-brand': '#26A1FF',
        'blue-start': '#2FBEFF',
        'blue-end': '#2395FF',
        'blue-dark': '#022F59',
        'orange': '#FFCB30',
        'peach': '#F7A159',
        'green-light': '#66ebb0',
        'off-white': '#EBEDF7',
        'darkest': '#1D1D1D',
        'gray-brand': '#5E656F',
        'gray-light': '#9ca5b4',
        'red-warning': '#FC6767'
      },
      fontFamily: {
        title: ['Blinker', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
      },
      fontSize: {
        xxxs: '10px',
        xxs: '11px',
        xs: '12px',
        sm: '13px',
        base: '14px',
        md: '15px',
        lg: '17px',
      },
      dropShadow: {
        'default': '0 2px 2px rgba(0, 0, 0, 0.5)'
      },
      boxShadow: {
        'center': '0px 0px 15px 0px rgba(0,0,0,0.15)'
      },
      backgroundImage: {
        'gradient-blue':
          'linear-gradient(180deg, rgba(47, 190, 255, 1) 0%, rgba(35, 149, 255, 1) 100%), url(/svg/gradient-square.svg)',
        'gradient-blue-2':
          ' linear-gradient(180deg, #2395ff 0%, #2fbeff 100%), url(/svg/gradient-square.svg)',
        'gradient-grey':
          'linear-gradient(0deg, rgba(237, 237, 237, 1) 0%, rgba(255, 255, 255, 1) 100%), url(/svg/gradient-square.svg)',
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss'),
    require('autoprefixer'),
    require("tailwindcss-animate"),
  ],
};
