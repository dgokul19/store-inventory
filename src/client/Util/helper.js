export const randomString = (length, chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    let result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.map((one) =>  {
        return arr2.some((two) => two.val === one.val);
    }).indexOf(false) > -1 ? false : true;
}