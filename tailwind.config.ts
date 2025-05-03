/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{vue}',
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#f5f5f5",
                color999: "#999",
            },
        },
        container: {
            center: true, // centers the container
            padding: '1rem',
            screens: {
                DEFAULT: '100%', // full width on all screens
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
        },
    },
    // plugins: [
    //     function ({addComponents}) {
    //         addComponents({
    //             '.center-block': {
    //                 marginLeft: 'auto',
    //                 marginRight: 'auto',
    //             }
    //         });
    //     }
    // ]
}
