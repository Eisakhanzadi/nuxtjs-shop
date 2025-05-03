export default function groupBy<T>(arr: T[], group: keyof T): { [key: string]: T[] } {
    const key = group as string
    return  arr.reduce((acc:{[key:string]:any}, item:any) => {
        if (!acc[item[key]]) {
            acc[item[key]] = [];
        }
        acc[item[key]].push(item);
        return acc;
    }, {});
}