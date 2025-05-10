import {defineStore} from 'pinia'

export const useHomeStore = defineStore('getHomeStore', {
    state: () => {
        return {
            home: {},
            newProducts: [],
            mostDiscount: [],
            mostSales: [],
            loading: false,
        }
    },
    getters: {
        getHome(state) {
            return state.home
        },
        getNewProducts(state) {
            return state.newProducts
        },
        getMostDiscount(state) {
            return state.mostDiscount
        },
        getMostSales(state) {
            return state.mostSales
        },
        getHome(state) {
            return state.home
        },

    },
    actions: {
        async fetchHome() {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/home`)
                await this.fetchMostSales()
                await this.fetchNewProducts()
                await this.fetchMostDiscount()
                this.home =await response.data.response
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchMostSales() {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/most-sales`)
                this.mostSales =response.data.response.mostSales
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchNewProducts() {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/new-products`)
                this.newProducts = response.data.response.new_products
                console.log(this.home , 'home')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchMostDiscount() {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/most-discounts`)
                this.home.most_discount =response.response.data.mostDiscount
                console.log(this.home , 'home')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },

    },
})
