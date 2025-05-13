import {defineStore} from 'pinia'

export const useGetUserStore = defineStore('getUserStore', {
    state: () => {
        return {
            user:null,
            loading: false,
            userStatus:{
                isLogin:false,
                token:"",
                mobile:"",
                fullName:"",
                carts:[],
            }
        }
    },
    getters: {
        getUserStatus(state) {
            return state.userStatus
        },
        getUser(state) {
            return state.user
        }
    },
    actions: {
        async fetchUser() {
            const jwt = useCookie('jwt').value
            const {public:{baseUrlTwo}} = useRuntimeConfig()
            const response = await $fetch(`${baseUrlTwo}front/get-user` , {
                headers:{
                    Authorisation:`Bearer ${jwt}`,
                    'content-type':'application/json'
                }
            })
            this.user = await response?.data
        },
    },
})
