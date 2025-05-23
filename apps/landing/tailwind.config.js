const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
import PrimeUI from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        accent: '#8B5CF6',
        warning: '#FBBF24',
        danger: '#EF4444',
        success: '#34D399',
        neutral: {
          900: '#1F2937',
          800: '#374151',
          700: '#4B5563',
          600: '#6B7280',
          500: '#9CA3AF',
          400: '#D1D5DB',
          300: '#E5E7EB',
          200: '#F3F4F6',
          100: '#F9FAFB',
          50: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [PrimeUI]
};
