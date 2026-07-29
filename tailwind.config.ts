import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        trama: {
          bg: '#F7F7F5',
          surface: '#FFFFFF',
          line: '#E5E7EB',
          text: '#1F2937',
          muted: '#6B7280',
          accent: '#0F766E',
          accentSoft: '#DFF4F1',
          terracotta: '#C66A50',
          success: '#0F9D58',
          warning: '#D97706',
          danger: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.06)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};

export default config;
