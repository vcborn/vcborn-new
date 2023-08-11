const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx', './public/**/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Poppins',
          'Noto Sans JP',
          'Noto Sans SC',
          'Noto Sans KR',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { transform: 'translateY(70px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      colors: {
        primary: '#163469',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-brand-colors'),
    require('@tailwindcss/forms'),
  ],
  variants: {
    animation: ['motion-safe'],
  },
}
