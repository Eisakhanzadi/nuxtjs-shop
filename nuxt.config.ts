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
    modules: ['@nuxtjs/tailwindcss' , '@pinia/nuxt','@nuxt/icon','@nuxt/image'],
    runtimeConfig:{
      public:{
          baseUrl:'http://localhost:8080/',
          baseUrlTwo:'https://api.atlasmode.shop/v1/',
      }
    },
    icon: {
        // mode: 'css',
        // cssLayer: 'base',
        fetchTimeout: 1000,
        // serverBundle: {
        //     collections: ['uil', 'mdi'] // <!--- this
        // },
        clientBundle: {
            scan:true,
            sizeLimitKb: 256,
        },
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
