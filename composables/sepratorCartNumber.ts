export default function separatorCartNumber (number:string|number) {
    const strNumber = number.toString();
    const result = [];

    for (let i = 0; i < strNumber.length; i += 4) {
        result.push(strNumber.slice(i, i + 4));
    }

    return result;
}