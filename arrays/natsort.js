/**
 * @name sb.arrays.natsort
 * @author Paul Visco
 * @description Sort the array values in a natural alpha numeric way so that 1,10,2,3,4,5 becomes 1,2,3,4,5,10
 * @param {Array} arr The orig array to natsort
 * @returns {Array} The natsorted array
 * @function
 * @example 
 * sb.arrays.natsort([1,10,2,3,4,5]);
 * //[1,2,3,4,5,10];
 */
sb.arrays.natsort = function(arr, direction) {
    direction = (direction == -1) ? -1 : 1;
    if (direction == -1) {
        arr.sort(function(a, b) {
            return (b - a);
        });
    } else {
        arr.sort(function(a, b) {
            return (a - b);
        });
    }
    return arr;
};