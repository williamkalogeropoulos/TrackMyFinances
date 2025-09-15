/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(0, 0%, 14%)',
        card: 'hsl(0, 0%, 99%)',
        'card-foreground': 'hsl(0, 0%, 14%)',
        primary: 'hsl(235, 100%, 60%)',
        'primary-foreground': 'hsl(0, 0%, 98%)',
        secondary: 'hsl(0, 0%, 97%)',
        'secondary-foreground': 'hsl(0, 0%, 20%)',
        muted: 'hsl(0, 0%, 97%)',
        'muted-foreground': 'hsl(0, 0%, 56%)',
        accent: 'hsl(0, 0%, 96%)',
        'accent-foreground': 'hsl(0, 0%, 20%)',
        destructive: 'hsl(9, 96%, 47%)',
        'destructive-foreground': 'hsl(0, 0%, 98%)',
        border: 'hsl(0, 0%, 92%)',
        input: 'hsl(0, 0%, 100%)',
        ring: 'hsl(0, 0%, 71%)',
      },
      borderRadius: {
        'ele': '0.8rem',
        'card': '1rem',
      }
    },
  },
  plugins: [],
}
