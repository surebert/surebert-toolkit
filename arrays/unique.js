/**
 * @name sb.arrays.unique
 * @author Paul Visco
 * @description Removes duplicate values from an array
 * @param {Array} arr The orig array
 * @returns {Array} TReturns an array of unique values from the original array
 * @function
 * @example 
 * sb.arrays.unique([5, 5, 10, 15]);
 * //[5,10,15];
 */
sb.arrays.unique = function(arr) {
    var n = [];
    arr.forEach(function(v) {
        if (!sb.arrays.inArray(n, v)) {
            n.push(v);
        }
    });
    return n;
};