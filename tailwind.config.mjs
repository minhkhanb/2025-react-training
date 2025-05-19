import defaultTheme from 'tailwindcss/defaultTheme';
import twAnimateCss from 'tw-animate-css';

/**
 * Tailwind CSS configuration file
 * - Uses ESM syntax (import/export) compatible with Next.js 15+
 * - Configured for Next.js App Router (scans the `app/` folder)
 * - Scans common React component directories (components, ui, pages)
 * - Extends default fonts with 'Inter' as primary font
 * - Defines custom primary color palette (can be adjusted per your design)
 * - Includes tw-animate-css plugin for animation support (recommended by shadcn/ui)
 */

/** @type {import('tailwindcss').Config} */
const config = {
  // Specify all files Tailwind should scan for class names
  content: [
    // Next.js App Router source files
    './app/**/*.{js,ts,jsx,tsx}',

    // Shared React components
    './components/**/*.{js,ts,jsx,tsx}',

    // UI library or shared UI components (e.g. shadcn/ui)
    './ui/**/*.{js,ts,jsx,tsx}',

    // Optional pages directory (if you use pages alongside app router)
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Extend Tailwind's default sans fonts by prepending 'Inter'
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Custom primary color palette; adjust to fit your branding
        primary: {
          DEFAULT: '#3b82f6', // main primary color
          light: '#60a5fa', // lighter shade
          dark: '#2563eb', // darker shade
        },
        // Add additional custom colors here as needed
      },
    },
  },
  plugins: [
    // Animation plugin recommended by shadcn/ui as replacement for tailwindcss-animate
    twAnimateCss,
  ],
};

export default config;
