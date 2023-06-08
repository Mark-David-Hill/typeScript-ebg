// Check to see if 2 arrays have equal values
function equalArrayCheck(arr1: [], arr2: []) {
    return Array.isArray(arr1) &&
        Array.isArray(arr2) &&
        arr1.length === arr2.length &&
        arr1.every((val, index) => val === arr2[index]);
}

export default equalArrayCheck;