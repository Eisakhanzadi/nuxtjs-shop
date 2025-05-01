export default function groupBy(arr: [], key: string) {
    const obj: { [key: string]: any } = {}
    arr.forEach(item => {
        if (obj[item[key]] === item[key]) {
            obj[item[key]] = item
        } else {
            obj[item[key]] = item
        }
    })
    return obj
}
