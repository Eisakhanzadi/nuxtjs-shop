export default function (data:string){
    const {$toast} = useNuxtApp()
    if( data.includes('|')){
        data.split('|').forEach((item, index) => {
            setTimeout(() => {
                useNuxtApp().$toast.error(item, {
                    autoClose: 2000,
                    dangerouslyHTMLString: true,
                });
            }, 300 * index)
        })
    }
    else{
        useNuxtApp().$toast.error(data, {
            autoClose: 2000,
            dangerouslyHTMLString: true,
        })
    }
}
