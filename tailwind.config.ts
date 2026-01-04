import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#0a0a0a',
          950: '#050505',
        },
        dark: {
          DEFAULT: '#000000',
          100: '#0a0a0a',
        },
        accent: {
          DEFAULT: '#fbbf24', // amber-400 (Gold)
          hover: '#f59e0b', // amber-500
          secondary: '#A3A3A3', // neutral-400
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
