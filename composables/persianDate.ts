import moment from 'jalali-moment'

export default function persianDate(time:string){
  const fullDate =   moment(time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  const persianMonth =   moment(time, 'YYYY/MM/DD').locale('fa').format('YYYY/MMM/DD');
  return {persianMonth:reverse(persianMonth), fullDate:reverse(fullDate)};
}

function reverse(string:string):string{
  let reverseTime  = string.split('/').reverse()
  return reverseTime.join(' - ');
}
