sb.include('sb.arrays.natsort');

sb.include('sb.arrays.range');
/**
 * @name sb.arrays.range
 * @description Determines the range of values in a numeric array.  
 * That is the highest value minus the lowest value
 * @param {Array} arr The array to get the range of
 * @returns {Number} The average value
 * @function
 * @example 
 * sb.arrays.range([1,10,2,3,4,5]);
 * //9
 */
sb.arrays.range = function(arr) {
    var a = sb.arrays.natsort(arr);
    return arr[a.length - 1] - a[0];
};