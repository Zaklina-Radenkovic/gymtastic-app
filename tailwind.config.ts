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
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
        },
        blue: {
          100: 'var(--color-blue-100)',
          700: 'var(--color-blue-700)',
        },
        green: {
          100: 'var(--color-green-100)',
          700: 'var(--color-green-100)',
        },
        yellow: {
          100: 'var(--color-yellow-100)',
          700: 'var(--color-yellow-100)',
        },
        silver: {
          100: 'var(--color-silver-100)',
          700: 'var(--color-silver-700)',
        },
        indigo: {
          50: 'var(--color-indigo-50)',
          100: 'var(--color-indigo-100)',
          200: 'var(--color-indigo-200)',
          500: 'var(--color-indigo-500)',
          600: 'var(--color-indigo-600)',
          700: 'var(--color-indigo-700)',
          800: 'var(--color-indigo-800)',
          900: 'var(--color-indigo-900)',
        },
        red: {
          100: 'var(--color-red-100)',
          700: 'var(--color-red-700)',
          800: 'var(--color-red-800)',
        },
        // accent: {
        //   50: '#FCF9EA',
        //   100: '#F8F3C9',
        //   200: '#F2E496',
        //   300: '#EACF5A',
        //   400: '#E2B72D',
        //   500: '#D2A120',
        //   600: '#B57E19',
        //   700: '#915B17',
        //   800: '#78491B',
        //   900: '#543217',
        //   950: '#3C200C',
        // },
      },
      borderRadius: {
        tiny: '3px',
        sm: '5px',
        md: '7px',
        lg: '9px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
        md: '0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06)',
        lg: '0 2.4rem 3.2rem rgba(0, 0, 0, 0.12)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
