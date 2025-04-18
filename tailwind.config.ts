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
                'primary-color': '#F172AC',
            },

        },
    },
    plugins: [],
}
