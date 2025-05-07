import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";

export const useWeblogStore = defineStore('useWeblogStore', {
    state: () => {
        return {
            weblogList: [],
            weblogDetails: null,
            weblogListCategories: [],
            loading: false,
            filterByGroup: []
        }
    },
    getters: {
        getWeblogList(state) {
            return state.weblogList
        },
        getWeblogDetails(state) {
            return state.weblogDetails
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
        async fetchWeblogDetails(id:string|number) {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            if (!this.weblogDetails?.length) {
                try {
                    this.loading = true
                    await $fetch(`${baseUrlTwo}front/posts/${id}`).then(res => this.weblogDetails = res.data.post)
                    console.log(this.weblogDetails)
                } catch (e) {
                    console.log(e)
                } finally {
                    this.loading = false
                }
            }
        },
    },
})
