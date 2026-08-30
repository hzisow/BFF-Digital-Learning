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
          // BFF brand blue. Nudged 0.7% darker in lightness (#0077b5 ->
          // #0075b3) so it clears 4.5:1 on the warm paper. At the shipped
          // value it measured 4.392 and failed AA for body-size text, which
          // this colour is used for in 94 places. Two hex digits and
          // imperceptible beside the logo; white on it as a button fill is
          // 5.01:1. Revert to #0077b5 if the brand guide is literal, and use
          // `accent-text` for body copy instead.
          600: '#0075b3',
          700: '#036092',
          800: '#075178',
          900: '#0b4364',
          950: '#072b43',
        },
        // Status ramps, hue-matched to the warm paper base.
        // Tailwind's stock green/red/amber are tuned for a white-and-zinc page
        // and go sour on cream. Overriding the scales here fixes every one of
        // the ~250 existing `text-red-700` / `bg-green-100` call sites at once,
        // instead of asking 250 edits to stay consistent by hand. Every
        // text-on-tint pair clears AA: 700-on-50 ranges 6.04-6.79, 700-on-100
        // 5.53-6.10, 700-on-paper 5.86-6.71.
        green: {
          50: 'oklch(97.2% 0.018 152 / <alpha-value>)', 100: 'oklch(94.0% 0.038 152 / <alpha-value>)',
          200: 'oklch(88.5% 0.062 152 / <alpha-value>)',
          300: 'oklch(79.5% 0.090 152 / <alpha-value>)', 400: 'oklch(70.0% 0.115 152 / <alpha-value>)',
          500: 'oklch(62.0% 0.140 152 / <alpha-value>)', 600: 'oklch(54.5% 0.150 152 / <alpha-value>)',
          700: 'oklch(46.5% 0.130 152 / <alpha-value>)', 800: 'oklch(40.0% 0.110 152 / <alpha-value>)',
          900: 'oklch(34.0% 0.090 152 / <alpha-value>)',
        },
        red: {
          50: 'oklch(97.2% 0.018 27 / <alpha-value>)', 100: 'oklch(94.0% 0.038 27 / <alpha-value>)',
          200: 'oklch(88.5% 0.062 27 / <alpha-value>)',
          300: 'oklch(79.5% 0.090 27 / <alpha-value>)', 400: 'oklch(70.0% 0.115 27 / <alpha-value>)',
          500: 'oklch(62.0% 0.140 27 / <alpha-value>)', 600: 'oklch(54.5% 0.150 27 / <alpha-value>)',
          700: 'oklch(46.5% 0.130 27 / <alpha-value>)', 800: 'oklch(40.0% 0.110 27 / <alpha-value>)',
          900: 'oklch(34.0% 0.090 27 / <alpha-value>)',
        },
        amber: {
          50: 'oklch(97.2% 0.018 70 / <alpha-value>)', 100: 'oklch(94.0% 0.038 70 / <alpha-value>)',
          200: 'oklch(88.5% 0.062 70 / <alpha-value>)',
          300: 'oklch(79.5% 0.090 70 / <alpha-value>)', 400: 'oklch(70.0% 0.115 70 / <alpha-value>)',
          500: 'oklch(62.0% 0.140 70 / <alpha-value>)', 600: 'oklch(54.5% 0.150 70 / <alpha-value>)',
          700: 'oklch(46.5% 0.130 70 / <alpha-value>)', 800: 'oklch(40.0% 0.110 70 / <alpha-value>)',
          900: 'oklch(34.0% 0.090 70 / <alpha-value>)',
        },
        // The brand blue is 4.39:1 on paper, under the 4.5 AA wants for normal
        // text. `bff-600` stays the fill/icon/display colour; anything at body
        // size uses this instead, at 6.13:1.
        'accent-text': 'oklch(46.8% 0.110 241.9 / <alpha-value>)',
        gold: {
          400: '#f0b35a',
          500: '#e09a33',
        },
        // Editorial base — warm cream "paper" and near-black navy "ink".
        paper: {
          DEFAULT: '#f5f3ec',
          deep: '#e9e5db',
        },
        ink: {
          DEFAULT: '#0c1a27',
          soft: '#12283a',
        },
      },
      fontFamily: {
        // The @fontsource variable packages register the family under a
        // "… Variable" name; the plain name is kept as a fallback in case the
        // font is also installed locally.
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        body: ['"Public Sans Variable"', '"Public Sans"', 'system-ui', 'sans-serif'],
      },
      // Deliberately tightened off the Tailwind defaults — bubbly, uniform
      // rounding is a giveaway of un-customized output. These crisper radii
      // read as an intentional design decision and ripple app-wide.
      borderRadius: {
        lg: '0.5rem',
        xl: '0.625rem', // was 0.75rem
        '2xl': '0.875rem', // was 1rem
        '3xl': '1.125rem', // was 1.5rem
      },
      boxShadow: {
        // A tight, layered shadow instead of one big soft blur.
        card: '0 1px 2px rgba(15, 42, 66, 0.06), 0 2px 8px rgba(15, 42, 66, 0.05)',
        'card-hover': '0 2px 4px rgba(15, 42, 66, 0.08), 0 10px 24px rgba(15, 42, 66, 0.09)',
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
