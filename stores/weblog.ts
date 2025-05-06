import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";

export const useWeblogStore = defineStore('useWeblogStore', {
    state: () => {
        return {
            weblogList: [],
            weblogListCategories: [],
            loading: false,
            filterByGroup: []
        }
    },
    getters: {
        getWeblogList(state) {
            return state.weblogList
        },
        getWeblogListCategories(state) {
            return state.weblogListCategories
        }
    },
    actions: {
        async fetchWeblogList() {
            try {
                this.loading = true
                this.weblogList = await useFetchData('weblog_list')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        async fetchWeblogListCategories() {
            try {
                this.loading = true
                this.weblogListCategories = await useFetchData('weblog_categories')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
    },
})
