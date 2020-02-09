export function getData(count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const value = Math.abs(Math.floor(Math.random() * (1 - 100) ) + 1);
        result.push({
            code: `code ${value}`,
            value: value
        })
    }
    return result;
}