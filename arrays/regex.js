/**
 * @name sb.arrays.regex
 * @author Paul Visco
 * @description Limit the values of an array to Values that do  not match the regex expression are excluded
 * @param {Array} arr The orig array
 * @param {String} expression The regex expression to match against
 * @returns {myArray} The average value
 * @function
 * @example 
 * sb.arrays.regex([5, 10, 15], /\d{2}/);
 * [10,15] //because they are at least two digits as specified in the regex \d{2}
 */
sb.arrays.regex = function(arr, expression) {

    return arr.filter(function(v, k, a) {
        if (v.toString().match(expression)) {
            return true;
        }
    });

};