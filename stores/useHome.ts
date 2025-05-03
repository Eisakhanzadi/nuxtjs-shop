import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";

export const useGetHomeStore = defineStore('getHomeStore', {
    state: () => {
        return {
            home: [],
            loading: false,
            filterByGroup: []
        }
    },
    getters: {
        getSetting(state) {
            return state.home
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async fetchHome() {
            try {
                this.loading = true
                this.home = await useFetchData('home')
                this.filterByGroup = groupBy(this.home ,'group')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
    },
})
