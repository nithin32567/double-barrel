/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                black: {
                    primary: '#0a0a0a',
                    secondary: '#1a1a1a',
                    tertiary: '#2a2a2a',
                },
                silver: {
                    primary: '#c0c0c0',
                    secondary: '#d4d4d4',
                    tertiary: '#a8a8a8',
                    light: '#e8e8e8',
                },
            },
            backgroundImage: {
                'gradient-silver': 'linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 100%)',
                'gradient-dark': 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
}
