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
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        async fetchHome() {

        },
    },
})
