/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-color': '#111111',
                'text-color': '#f3f4f6',
            },
            boxShadow: {
                node: '10px 0 15px rgba(42, 138, 246, 0.3), -10px 0 15px rgba(233, 42, 103, 0.3)',
            },
            borderRadius: {
                'node': '10px',
            },
            keyframes: {
                spinner: {
                    '100%': {transform: 'translate(-50%, -50%) rotate(-360deg)'},
                },
            },
            animation: {
                spinner: 'spinner 4s linear infinite',
            },
        },
    },
    plugins: [],
}

