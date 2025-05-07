import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";

export const useProductsStore = defineStore('getProductsStore', {
    state: () => {
        return {
            products: [],
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
            try {
                this.loading = true
                this.products = await useFetchData('products')
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
