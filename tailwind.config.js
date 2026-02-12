/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                'brand-cream': '#FDF3DD',
                'brand-blue': '#3b82f6',
                'brand-yellow': '#FFD700',
                'brand-orange': '#FF9F43',
                'brand-pink': '#FF6B6B',
                'brand-green': '#4ECDC4',
                'brand-purple': '#A78BFA',
                'navy': '#0B1B3A', // Keeping this from original config just in case
            },
            fontFamily: {
                'display': ['Fredoka', 'sans-serif'],
                'body': ['Nunito', 'sans-serif'],
                'pixel': ['"Press Start 2P"', 'cursive'],
                'sans': ['Nunito', 'sans-serif'], // Default sans to Nunito
            },
            animation: {
                'fade-in-scale': 'fadeInScale 0.8s ease-out forwards',
                'slide-up-fade': 'slideUpFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'pulse-soft': 'pulseSoft 3s infinite ease-in-out',
                'float': 'float 6s ease-in-out infinite',
                'marquee': 'marquee 30s linear infinite',
                'marquee-reverse': 'marqueeReverse 30s linear infinite',
                'confetti': 'confetti 4s linear infinite',
                'shadanim': 'shadanim 15s linear infinite',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            keyframes: {
                fadeInScale: {
                    '0%': { opacity: '0', transform: 'scale(0.9) translateY(10px)' },
                    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                slideUpFade: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                marqueeReverse: {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                confetti: {
                    '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0.8' },
                },
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                shadanim: {
                    '0%': { 'background-position': '100% -100%' },
                }
            }
        }
    },
    plugins: [],
}
