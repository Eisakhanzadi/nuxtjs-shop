import {defineStore} from 'pinia'
import useFetchData from "~/composables/useFetchData";
import groupBy from "~/composables/groupBy";

export const useGetSettingsStore = defineStore('getSettingsStore', {
    state: () => {
        return {
            settings: [],
            shopInfo:[],
            loading: false,
            filterByGroup: []
        }
    },
    getters: {
        getSetting(state) {
            return state.settings
        },
        getShopInfo(state) {
            return state.shopInfo
        },

    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async fetchSettings() {
            try {
                this.loading = true
                this.settings = await useFetchData('settings')
                this.filterByGroup = groupBy(this.settings, 'group')
                console.log(this.filterByGroup)
                this.shopInfoGroup()
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },
        shopInfoGroup(){
            this.shopInfo = groupBy(this.filterByGroup?.site, 'name')
            console.log(this.shopInfo)
        }

    },
})
