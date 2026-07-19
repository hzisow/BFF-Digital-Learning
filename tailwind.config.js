/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bff: {
          50: '#eaf6fd',
          100: '#d0ecfa',
          200: '#a6daf4',
          300: '#6fc1ea',
          400: '#33a3da',
          500: '#0e88c4',
          600: '#0077b5', // BFF brand blue (from logo)
          700: '#036092',
          800: '#075178',
          900: '#0b4364',
          950: '#072b43',
        },
        // Warm paper background + warm ink text = editorial, not cold-AI-gray.
        paper: {
          DEFAULT: '#faf7f2',
          100: '#f3eee5',
          200: '#e9e2d5',
        },
        ink: {
          DEFAULT: '#1c1a17',
          soft: '#4b463f',
          faint: '#726b60',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ticker-flash-up': {
          '0%': { backgroundColor: 'rgba(34,197,94,0.35)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'ticker-flash-down': {
          '0%': { backgroundColor: 'rgba(239,68,68,0.35)' },
          '100%': { backgroundColor: 'transparent' },
        },
        float: {
          '0%, 100%': { transform: 'translate(-50%, 0)' },
          '50%': { transform: 'translate(-50%, -7px)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-up': {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.35s ease-out both',
        'slide-up': 'slide-up 0.4s ease-out both',
        'flash-up': 'ticker-flash-up 1.2s ease-out',
        'flash-down': 'ticker-flash-down 1.2s ease-out',
        float: 'float 2.2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-up': 'slide-in-up 0.4s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
