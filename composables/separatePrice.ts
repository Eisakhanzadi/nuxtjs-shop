export default function separatePrice(num:number|string):string{
   return num.toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
