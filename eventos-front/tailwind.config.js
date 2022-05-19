module.exports = {
    content: ["./src/**/*.{html,js}"],
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
            'mobile': '400px',
            'tablet': '750px',
            'laptop': '1000px',
            'desktop': '1280px',
        },
        extend: {
            backgroundImage: {
                'bg-atraccion': "url('./assets/atraccion.jpg')",
                'bg-objetos': "url('./assets/objetos.jpg')",
                'bg-confeti': "url('./assets/confeti.jpg')",
                'bg-olly': "url('./assets/gente.webp')",
                'bg-pintura': "url('./assets/pintura.jpg')",
            },
            colors: {
                cream: {
                    bg: "#f0edbb"
                }
            },
            maxHeight: {
                '1/2': '50%',
                '1/4': '25%',
                '1/6': '16%'
            },
            maxWidth: {
                '3/4': '75%',
                '1/2': '50%',
                '1/4': '25%',
                '1/6': '16%'
            },
        },

    },
    variants: {
        extend: {},
    },
    plugins: [],
}