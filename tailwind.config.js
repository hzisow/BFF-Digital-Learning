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
        gold: {
          400: '#f0b35a',
          500: '#e09a33',
        },
        // Editorial base, on the Wealthsimple warm cream-to-graphite axis.
        //
        // The whole palette is deliberately WARM. The previous ink was a cool
        // navy (#0c1a27) and the paper a cool-ish cream; swapping those two
        // values is what re-tones every surface in the app at once, because
        // `text-ink`, `bg-paper` and `border-ink/10` are used everywhere.
        //
        // Rule from the system: never pure #000 for text. Graphite keeps the
        // dark tones warm against cream.
        paper: {
          DEFAULT: '#fcfcfc', // page canvas
          deep: '#faf8f5',    // linen cream — alternate warm section
          soft: '#f1f0f0',    // quiet elevated regions, hover washes
        },
        stone: '#e4e2e1',     // the only structural line colour
        pebble: '#686664',    // secondary text, helper copy
        ink: {
          DEFAULT: '#32302f', // graphite ink — primary text
          soft: '#4a4746',
          deep: '#09090a',    // charcoal — the primary pill fill
        },
        bronze: '#3a3525',    // full-bleed dark feature blocks
      },
      fontFamily: {
        // The @fontsource variable packages register the family under a
        // "… Variable" name; the plain name is kept as a fallback in case the
        // font is also installed locally.
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        body: ['"Public Sans Variable"', '"Public Sans"', 'system-ui', 'sans-serif'],
      },
      // Softness is the signature: "the extreme roundness makes even dense
      // product UI feel boutique." Buttons and inputs are full pills; cards get
      // a large soft radius rather than the literal 100px, which on a narrow
      // card collapses into a lozenge and loses the corner entirely.
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        card: '1.75rem',
        pill: '9999px',
      },
      boxShadow: {
        // Deliberately none. "Don't apply CSS drop shadows to cards, modals or
        // buttons — rely on the warm surface stack and hairlines instead."
        // Kept as named tokens rather than deleted so the ~40 existing
        // `shadow-card` usages resolve to nothing instead of failing to build.
        card: 'none',
        'card-hover': 'none',
      },
      letterSpacing: {
        tightish: '-0.011em',
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
