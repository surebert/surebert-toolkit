/**
 * @name sb.arrays.max
 * @author Paul Visco
 * @description Finds the maximum value in an alpha/numeric array.  
 * Sorts alphanumerically and chooses the highest.  
 * Number have preference over letters, so 1 is higher than 'apple'
 * @param {Array} arr The array to return the max value from 
 * @returns {number} max value in array
 * @function
 * @example 
 * sb.arrays.max([5, 10, 15]);
 * //15;
 */
sb.arrays.max = function(arr) {
    var max = arr[0];
    arr.forEach(function(v) {
        max = (v > max) ? v : max;
    });
    return max;
};