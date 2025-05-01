import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";

export const useGetSettingsStore = defineStore('getSettingsStore', {
    state: () => {
        return {
            settings: [],
            loading: false,
            filterByGroup: []
        }
    },
    getters: {
        getSetting(state) {
            return state.settings
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async fetchSettings() {
            try {
                this.loading = true
                this.settings = await useFetchData('settings')
                this.filterByGroup = groupBy(this.settings ,'group')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
    },
})
