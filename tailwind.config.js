/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coffee: {
          950: '#0f0704',
          900: '#1c0d08',
          800: '#2b1810',
          700: '#3d2314',
          600: '#5a3622',
          500: '#7c4d32',
          400: '#9c6644',
          300: '#b08968',
          200: '#ddb892',
          100: '#e6ccb2',
          50:  '#f7f1e5',
        },
        accent: {
          gold: '#e6b800',
          amber: '#d4a373',
          caramel: '#c87d55',
          cream: '#fefae0',
          bronze: '#8c5319',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'steam': 'steam 4s infinite linear',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(212, 163, 115, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 30px rgba(212, 163, 115, 0.8))' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-60px) scaleX(1.5)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      backgroundImage: {
        'glass-radial': 'radial-gradient(circle at center, rgba(212, 163, 115, 0.15) 0%, rgba(15, 7, 4, 0.95) 70%)',
        'gold-gradient': 'linear-gradient(135deg, #e6b800 0%, #c87d55 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1c0d08 0%, #0f0704 100%)',
      }
    },
  },
  plugins: [],
}
