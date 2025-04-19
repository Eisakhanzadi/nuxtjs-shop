// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    app: {
        head: {
            htmlAttrs: {
                dir:'rtl',
                lang:'fa'
            }
        }
    },
    css: ['~/assets/css/main.css'],
    modules: ['@nuxtjs/tailwindcss' , '@pinia/nuxt'],
    runtimeConfig:{
      public:{
          baseUrl:'http://localhost:8080/',
      }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
