/**
 * @name sb.arrays.copy
 * @author Paul Visco
 * @description Makes a new independent copy of an array instead of a pointer to it
 * @param {Array} arr The array to copy
 * @returns {Array} A new array with the same value as the one it is making a copy of
 * @function
 * @example 
 * sb.arrays.copy();
 */
sb.arrays.copy = function(arr) {
    return arr.filter(function() {
        return true;
    });
};