/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#ff7f00',
          light: '#ff9e3d',
          dim: '#fff3e0',
          dark: '#e65c00',
        },
        brand: {
          dark: '#0f172a',
          navy: '#1e3a5f',
          blue: '#1a56db',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.07)',
        orange: '0 4px 20px rgba(255,127,0,0.35)',
        'orange-lg': '0 8px 28px rgba(255,127,0,0.42)',
      },
    },
  },
  plugins: [],
};
