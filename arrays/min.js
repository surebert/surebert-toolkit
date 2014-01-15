/**
 * @name sb.arrays.min
 * @author Paul Visco
 * @description Finds the minimum value in an alpha/numeric array.  
 * Sorts alphanumerically and chooses the lowest.  
 * Number have preference over letters, 'apple' is lower than 1
 * @param {Array} arr The array to return the min value from 
 * @returns {number} min value in array
 * @function
 * @example 
 * sb.arrays.min([5, 10, 15]);
 * //5;
 */
sb.arrays.min = function(arr) {
    var min = arr[0];
    arr.forEach(function(v) {
        min = (v < min) ? v : min;
    });
    return min;
};