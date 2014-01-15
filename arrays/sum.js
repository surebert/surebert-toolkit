/**
 * @name sb.arrays.sum
 * @author Paul Visco
 * @description Add up the values in an array
 * @param {Array} arr The orig array
 * @returns {Number} The average value
 * @function
 * @example 
 * sb.arrays.sum([5, 5, 10, 15]);
 * //35;
 */
sb.arrays.sum = function(arr) {
    var val = 0;
    arr.forEach(function(v) {
        val += v;
    });
    return val;
};