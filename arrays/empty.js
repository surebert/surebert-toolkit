/**
 * @name sb.arrays.empty
 * @author Paul Visco
 * @description Empties an array without removing other properties by resetting length
 * @param {Array} arr The orig array to empty
 * @returns {Array} The arr without any values
 * @function
 * @example 
 * sb.arrays.empty(arr);
 */
sb.arrays.empty = function(arr) {
    arr.length = 0;
    return arr;
};