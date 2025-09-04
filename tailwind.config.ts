import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: 'var(--primary-font)',
        secondary: 'var(--secondary-font)'
      },
      colors: {
        black: {
          100: '#1E2428',
          200: '#42474C',
          300: '#616262'
        },
        blue: {
          100: '#2a93c9',
          200: '#56b0cf',
          300: '#0674d1'
        },
        purple: {
          100: '#7b56bd'
        },
        red: {
          100: '#e74c3c'
        },
        green: {
          100: '#11a762'
        }
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'
      }
    }
  }
}
export default config
