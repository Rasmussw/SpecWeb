/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      aspectRatio: {
        '3/2': '3 / 2',
      },
      lineHeight: {
        20: '80px',
      },
      screens: {
        xs: '400px',
        lg: '1025px',
      },
      padding: {
        80: '20rem',
        96: '24rem',
        128: '32rem',
      },
      height: {
        13: '3.25rem',
      },
      width: {
        13: '3.25rem',
      },
      margin: {
        80: '20rem',
        96: '24rem',
        128: '32rem',
      },
      boxShadow: {
        '2md': '0px 8px 8px #00000029',
        banner: '0px 2px 2px #00000029',
      },
      borderRadius: {
        '2sm': '3px',
      },
      fontFamily: {
        Graphik: ['Graphik', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      colors: {
        primary: '#EB641E',
        primaryHover: '#D45A1B',
        default: '#474747',
        orange: {
          100: '#FBE0D2',
          200: '#F7C1A5',
          300: '#F3A278',
          400: '#EF834B',
          500: '#EB641E',
          600: '#D45A1B',
          700: '#BC5018',
          800: '#A54615',
          900: '#8D3C12',
        },
        green: {
          100: '#D0F8DD',
          200: '#A0F2BB',
          300: '#71EB9A',
          400: '#41E578',
          500: '#12DE56',
          600: '#10C84D',
          700: '#0EB245',
          800: '#0D9B3C',
          900: '#0B8534',
        },
        red: {
          100: '#FDD5D5',
          200: '#FCABAB',
          300: '#FA8080',
          400: '#F95656',
          500: '#F72C2C',
          600: '#DE2828',
          700: '#C62323',
          800: '#AD1F1F',
          900: '#941A1A',
        },
        yellow: {
          100: '#FDF6D0',
          200: '#FCEDA1',
          300: '#FAE372',
          400: '#F9DA43',
          500: '#F7D114',
          600: '#DEBC12',
          700: '#C6A710',
          800: '#AD920E',
          900: '#947D0C',
        },
        blue: {
          100: '#D2ECF8',
          200: '#A5D8F2',
          300: '#77C5EB',
          400: '#4AB1E5',
          500: '#1D9EDE',
          600: '#1A8EC8',
          700: '#177EB2',
          800: '#146F9B',
          900: '#115F85',
        },
        neutral: {
          100: '#EBEBEB',
          200: '#D6D6D6',
          300: '#C2C2C2',
          400: '#ADADAD',
          500: '#999999',
          600: '#858585',
          700: '#707070',
          800: '#5C5C5C',
          900: '#474747',
        },
      },
    },
  },
  plugins: [],
};


