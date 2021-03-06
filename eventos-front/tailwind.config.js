module.exports = {
    content: ["./src/**/*.{html,js}"],
    purge: [],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        screens: {
            'mobile': '400px',
            'tablet': '750px',
            'laptop': '1000px',
            'desktop': '1280px',
        },
        extend: {
            animation: {
                'bounce-short': 'bounce 1s ease-in-out 5'
            },
            backgroundImage: {
                'bg-amigos': "url('./assets/amigos.jpg')",
                'bg-cervezas': "url('./assets/cervezas.jpg')",
                'bg-engranaje': "url('./assets/engranaje.png')",
                'bg-objetos': "url('./assets/objetos.jpg')",
                'bg-confeti': "url('./assets/confeti.jpg')",
                'bg-olly': "url('./assets/gente.webp')",
                'bg-pintura': "url('./assets/pintura.jpg')",
                'bg-fondoQuestion': "url('./assets/question.png')",
            },
            maxHeight: {
                '1/2': '50%',
                '1/4': '25%',
                '1/6': '16%'
            },
            minWidth: {
                '3/4': '75%',
                '1/2': '50%',
                '1/4': '25%',
                '1/6': '16%'
            },
            maxWidth: {
                '3/4': '75%',
                '3/5': '60%',
                '1/2': '50%',
                '1/4': '25%',
                '1/6': '16%',
                'fit-content': 'fit-content'
            },
            width: {
                '1/8': '10.5%'
            }
        },

    },
    variants: {
        extend: {},
    },
    plugins: [],
}