export default function textShortener(text:string , end:number=50 , start:number=0):string{
    return `${text.substring(start , end)}...`
}