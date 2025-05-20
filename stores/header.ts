import {defineStore} from 'pinia'

export const useHeaderStore = defineStore('getHeaderStore', {
    state: () => {
        return {
            menus: [],
            loading: false,
        }
    },
    getters: {
        getMenus(state) {
            return state.menus
        },

    },
    actions: {
        async fetchHeaderMenu() {
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            try {
                this.loading = true
                const response = await $fetch(`${baseUrlTwo}all/menus/header`)
                this.menus = response.data.menus
                console.log(this.menus , 'menus')
            } catch (e) {
                console.log(e)
            } finally {
                this.loading = false
            }
        },

    },
})
