import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";

export const useProductsStore = defineStore('getProductsStore', {
    state: () => {
        return {
            products: {},
            loading: false,
            filterByGroup: []
        }
    },
    getters: {
        getProducts(state) {
            return state.products
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
    },
})
