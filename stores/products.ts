import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";

export const useProductsStore = defineStore('getProductsStore', {
    state: () => {
        return {
            products: {},
            newProducts: null,
            categories: [],
            loading: false,
            color_ranges:null,
            filterByGroup: [],
            lastPage: 1,
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
        },
        getColors(state){
            return state.color_ranges
        }
    },
    actions: {
        async fetchProducts(query?: { [key: string]: any }) {
            const {public: {baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/products`, {
                    method: 'GET',
                    query
                })
                this.products = await response.data
                this.lastPage = response.data.products.last_page
                // this.filterByGroup = groupBy(this.products ,'group')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchProductsColorsFilter() {
            const {public: {baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/color-ranges`)
                this.color_ranges = await response.data.colorRanges
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchNewProducts() {
            const {public: {baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}front/new-products`)
                this.newProducts = await response.data.response.new_products
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchCategories() {
            const {public: {baseUrlTwo}} = useRuntimeConfig()
            if (!this.categories?.length) {
                try {
                    this.loading = true
                    const response = await $fetch(`${baseUrlTwo}front/get-categories`)
                    this.categories = await response
                } catch (e) {
                    console.log(e)
                } finally {
                    this.loading = false
                    console.log(this.products)
                }
            }
        }
    },
})
