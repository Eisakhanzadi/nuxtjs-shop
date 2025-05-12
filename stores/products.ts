import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";

export const useProductsStore = defineStore('getProductsStore', {
    state: () => {
        return {
            products: {},
            newProducts:null,
            categories:null,
            loading: false,
            filterByGroup: []
        }
    },
    getters: {
        getProducts(state) {
            return state.products
        },
        getNewProducts(state) {
            return state.newProducts
        },
        getCategories(state) {
            return state.categories
        }
    },
    actions: {
        async fetchProducts() {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/products`)
                this.products =await response.data
                console.log(this.products)
                // this.filterByGroup = groupBy(this.products ,'group')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchProductsColorsFilter() {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/color-ranges`)
                this.products['color_ranges'] =await response.data.colorRanges
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
                this.newProducts =await response.data.response.new_products
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchCategories() {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/get-categories`)
                this.categories =await response
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
                console.log(this.products)
            }
        }
    },
})
