/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        card: '#0a0a0c',
        accent: {
          DEFAULT: '#e8e4dc',
          hover: '#d6d1c6',
          contrast: '#050505',
        },
        surface: {
          lit: '#cfc9bc',
          'lit-ink': '#16150f',
          'lit-ink-soft': '#2c2a22',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at center, #222222 0%, #000000 80%)',
        'chrome-gradient': 'linear-gradient(to bottom, #ffffff 0%, #d1d5db 50%, #1f2937 100%)',
      },
    },
  },
  plugins: [],
};
