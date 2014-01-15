/**
 * @name sb.arrays.random
 * @description Grab a random value from the array.  
 * The value is randomly selected each time the value is run.
 * @param {Array} arr The array to get the random value from
 * @returns {*}  Returns a random value from the array.  Type is the same as the value.
 * @function
 * @example 
 * sb.arrays.random([1,10,2,3,4,5]);
 * //4
 */
sb.arrays.random = function(arr) {
    var a = sb.arrays.natsort(arr);
    return arr[sb.math.rand(0, arr.length)];
};