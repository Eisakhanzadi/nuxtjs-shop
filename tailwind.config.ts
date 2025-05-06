/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{vue,js}',
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#f5f5f5',
                'dark': '#3b4447',
                'color-999': '#999',
                'color-444': '#444',
                'text-yellow2': '#FEBD00',
                'text-yellow': '#FFD02C',
                'them-subTitle': '#9B9B9B',
                'text-gray-27': '#272727',
                'gray-btn': '#3C3C3C',
                'gray-CB': '#CBCBCB',
                'theme-red1': '#C01014',
                'theme-red-c1': '#C10E0F',
                'theme-black-3c': '#3C3C3D',
                'theme-black-34': '#343434',
                'theme-black-5e': '#5E5E5E',
                'theme-black-4b': '#4B4B4B',
                'theme-black-45': '#454545',
                'theme-black-44': '#44464F',
                'theme-black-50': '#505050',
                'text-color1': '#626262',
                'theme-gray-52': '#525252',
                'theme-gray-49': '#494949',
                'theme-gray-77': '#777777',
                'theme-gray-35': '#353535',
                'theme-gray-98': '#989898',
                'theme-gray-9a': '#9A9A9A',
                'theme-gray-85': '#858585',
                'theme-gray-56': '#565656',
                'theme-gray-62': '#626262',
                'theme-gray-99': '#999999',
                'theme-gray-69': '#696969',
                'theme-gray-74': '#747474',
                'theme-gray-53': '#535353',
                'theme-gray-B4': '#B4B4B4',
                'theme-gray-5B': '#5B5B5B',
                'theme-gray-8B': '#8B8B8B',
                'theme-gray-48': '#484848',
                'theme-gray-F6': '#F6F6F6',
                'theme-gray-9C': '#9C9C9C',
                'theme-gray-E0': '#E0E0E0',
                'theme-gray-F2': '#F2F2F2',
                'theme-gray-F8': '#F8F8F8',
                'theme-parageraph': '#FFFFFFB8',
                'theme-gray-FF78': '#FFFFFF78',
                'theme-gray-F4': '#F4F4F4',
                'theme-dark-red': '#A41A1B',
                'theme-red-DF': '#DF2A2D',
                'theme-red-AE': '#AE2C2E',
                'theme-red-B1': '#B12B2D',
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
