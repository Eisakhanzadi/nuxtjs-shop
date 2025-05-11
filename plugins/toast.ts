import Vue3Toastify,{ toast, updateGlobalOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'assets/css/toast.css'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.globalProperties.Vue3Toastify = {
        install: () => {
            updateGlobalOptions({

            });
        },
    };
    nuxtApp.vueApp.use(Vue3Toastify , {
        autoClose: 3000,
        transition: toast.TRANSITIONS.FLIP,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        position: "top-right",
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: false,
        closeButton: false,
        rtl: true,
        icon:false
    })

    return {
        provide: {
            toast,
        },
    };
});
