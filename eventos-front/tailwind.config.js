module.exports = {
    content: ["./src/**/*.{html,js}"],
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            'mobile': { 'max': '400px' },
            'tablet': { 'max': '700px' },
            // => @media (max-width: 640px) { ... }

            'laptop': { 'max': '1000px' },
            // => @media (max-width: 1024px) { ... }

            'desktop': '1280px',
            // => @media (min-width: 1280px) { ... }
        },
        extend: {
            backgroundImage: {
                'bg-confeti': "url('./assets/confeti.jpg')",
                'bg-olly': "url('./assets/gente.webp')",
            },
            colors: {
                cream: {
                    bg: "#f0edbb"
                }
            },
            maxWidth: {
                '1/2': '50%'
            },
        },

    },
    variants: {
        extend: {},
    },
    plugins: [],
}