sb.include('arrays.sum');
/**
 * @name sb.arrays.avg
 * @author Paul Visco
 * @description Used to determine the average value from an array of values
 * @param {Array} arr The array to average
 * @returns {Number} The average value
 * @function
 * @example 
 * sb.arrays.avg([1,3,4,5]);
 * //3.25
 */
sb.arrays.avg = function(arr) {
    var tl = sb.arrays.sum(arr);
    return tl / arr.length;
};