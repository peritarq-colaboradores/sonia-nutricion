import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f4',
          100: '#e9ede3',
          200: '#d3dbc8',
          300: '#b1c098',
          400: '#8fa36c',
          500: '#6f8a4e',
          600: '#566e3c',
          700: '#445832',
          800: '#39492b',
          900: '#303e26',
        },
        terra: {
          50:  '#fdf6f0',
          100: '#fce8d8',
          200: '#f8ccac',
          300: '#f3a87a',
          400: '#ec7e48',
          500: '#e05e26',
          600: '#c0481b',
          700: '#9e3717',
          800: '#7d2d16',
          900: '#5c2113',
        },
        cream: {
          50: '#fdfcf8',
          100: '#faf7ef',
          200: '#f4edd8',
        },
        warm: {
          50:  '#fdf8f0',
          100: '#faefd8',
          200: '#f5ddb0',
          300: '#edca80',
          400: '#d9a84e',
          500: '#c08a30',
          600: '#9c6e22',
          700: '#7a541a',
          800: '#5e4016',
          900: '#3d2a0e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.04), 0 4px 12px 0 rgba(0,0,0,0.06)',
        'card-hover': '0 4px 6px -1px rgba(0,0,0,0.05), 0 10px 20px -5px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
export default config
