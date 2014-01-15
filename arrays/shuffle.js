/**
 * @name sb.arrays.shuffle
 * @author Paul Visco
 * @description shuffle the values in an array randomly
 * @param {Array} arr The orig array
 * @returns {Array} The array with values shuffled
 * @function
 * @example 
 * sb.arrays.sum([5, 5, 10, 15]);
 * //35;
 */
sb.arrays.shuffle = function(arr) {
    var i = arr.length, j, t;

    while (i--)
    {
        j = Math.floor((i + 1) * Math.random());
        t = arr[i];
        arr[i] = arr[j];
        arr[j] = t;
    }
    return arr;
};