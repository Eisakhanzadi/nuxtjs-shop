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
                primary:"#f5f5f5" ,
                color999:"#999" ,
            },

        },
    },
    plugins: [],
}
