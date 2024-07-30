import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF3FF',
          100: '#DBE3FE',
          200: '#BFCDFE',
          300: '#93ABFD',
          400: '#6083FA',
          500: '#3B66F6',
          600: '#2552EB',
          700: '#1D48D8',
          800: '#1E3FAF',
          900: '#1E378A',
          950: '#172554',
        },
        accent: {
          50: '#FCF9EA',
          100: '#F8F3C9',
          200: '#F2E496',
          300: '#EACF5A',
          400: '#E2B72D',
          500: '#D2A120',
          600: '#B57E19',
          700: '#915B17',
          800: '#78491B',
          900: '#543217',
          950: '#3C200C',
        },
      },
    },
  },
  plugins: [],
};
export default config;
