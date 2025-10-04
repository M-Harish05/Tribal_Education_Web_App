/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)', // warm cream
        foreground: 'var(--color-foreground)', // deep brown
        border: 'var(--color-border)', // ochre at 20% opacity
        input: 'var(--color-input)', // beige
        ring: 'var(--color-ring)', // terracotta
        card: {
          DEFAULT: 'var(--color-card)', // beige
          foreground: 'var(--color-card-foreground)', // deep brown
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // beige
          foreground: 'var(--color-popover-foreground)', // deep brown
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // beige
          foreground: 'var(--color-muted-foreground)', // medium brown
        },
        primary: {
          DEFAULT: 'var(--color-primary)', // terracotta
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // ochre
          foreground: 'var(--color-secondary-foreground)', // deep brown
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // forest green
          foreground: 'var(--color-accent-foreground)', // white
        },
        success: {
          DEFAULT: 'var(--color-success)', // lime green
          foreground: 'var(--color-success-foreground)', // deep brown
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // warm orange
          foreground: 'var(--color-warning-foreground)', // deep brown
        },
        error: {
          DEFAULT: 'var(--color-error)', // muted red
          foreground: 'var(--color-error-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // muted red
          foreground: 'var(--color-destructive-foreground)', // white
        },
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'tribal-sm': '0 2px 4px var(--shadow-color)',
        'tribal-md': '0 4px 8px var(--shadow-color)',
        'tribal-lg': '0 8px 16px var(--shadow-color)',
      },
      borderRadius: {
        'tribal': '8px',
        'tribal-sm': '4px',
      },
      animation: {
        'voice-pulse': 'pulse 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite',
      },
      transitionTimingFunction: {
        'tribal': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      transitionDuration: {
        'tribal': '250ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        'touch': '48px',
      },
      minWidth: {
        'touch': '48px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}