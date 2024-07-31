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
          50: '#fff',
          100: '#f9fafb',
          200: '#f3f4f6',
          300: '#e5e7eb',
          400: '#d1d5db',
          500: '#9ca3af',
          600: '#6b7280',
          700: '#4b5563',
          800: '#374151',
          900: '#1f2937',
          950: '#111827',
        },
        blue: {
          100: '#e0f2fe',
          700: '#0369A1',
        },
        green: {
          100: '#dcfce7',
          700: '#15803d',
        },
        yellow: {
          100: '#fef9c3',
          700: '#a16207',
        },
        silver: {
          100: '#e5e7eb',
          700: '#374151',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        red: {
          100: '#fee2e2',
          700: '#b91c1c',
          800: '#991b1b',
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
    },
  },
  plugins: [],
};
export default config;
