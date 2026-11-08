/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stripe Royal Slate Theme Tokens
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
          950: '#0B1D3A',
        },
        slate: {
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        brand: {
          primary: '#1E3A8A',   // Royal Navy primary
          accent: '#2563EB',    // Electric Cobalt accent
          hover: '#1D4ED8',
        },
        // Specialized Agent Color Identifiers
        agent: {
          coordinator: '#8B5CF6',  // Electric Violet
          attendance: '#10B981',   // Emerald Green
          fee: '#F59E0B',          // Amber Gold
          exam: '#06B6D4',         // Cyan Sky
          timetable: '#A855F7',    // Deep Purple
          assignment: '#F43F5E',   // Vibrant Rose
          support: '#38BDF8',      // Ocean Blue
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'soft-xs': '0 1px 2px rgba(16, 24, 40, 0.05)',
        'soft-sm': '0 1px 3px rgba(16, 24, 40, 0.07), 0 1px 2px rgba(16, 24, 40, 0.04)',
        'soft-md': '0 4px 8px -2px rgba(16, 24, 40, 0.08), 0 2px 4px -2px rgba(16, 24, 40, 0.04)',
        'soft-lg': '0 12px 16px -4px rgba(16, 24, 40, 0.08), 0 4px 6px -2px rgba(16, 24, 40, 0.03)',
        'soft-xl': '0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}
