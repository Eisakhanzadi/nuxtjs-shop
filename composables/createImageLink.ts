export default async function createImageLink(link:string){
    const {public:{baseImageUrl}} = useRuntimeConfig()
    return `${baseImageUrl}/${link}`
}
