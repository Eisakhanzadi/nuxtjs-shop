export default async function useFetchData(link:string){
    const {public: {baseUrl},serverBaseUrl} = useRuntimeConfig()

    const response  = await $fetch(`${baseUrl}${link}`)
    const data  = await response
    return data
}
