export default async function useFetchData(link:string ,method:string='GET' , body?:{[key:string]:any}, secondBaseUrl?: string) {
    const {public: {baseUrl},serverBaseUrl} = useRuntimeConfig()

    const response  = await $fetch(`${secondBaseUrl?.length??baseUrl}${link}` , {
        method ,
        body
    })
    const data = await response
    return data
}
