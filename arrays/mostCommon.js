/**
 * @name sb.arrays.mostCommon
 * @author Paul Visco
 * @description Finds the most common value in an array.  
 * If no value is most common then it returns false.
 * @param {Array} arr The array to return the max value from 
 * @returns {(String|number|Object)} Returns the most common value in the array or false if no value is most common.
 * @function
 * @example 
 * myArray.mostCommon([5, 10, 15]);
 * //false;
 * myArray.mostCommon([5, 5, 10, 15]);
 * //answer = 5;
 */
sb.arrays.mostCommon = function(arr) {
    var count = 0, max = 0, num = 0, mode = 0;
    arr.sort();
    arr.forEach(function(v) {

        if (num != v) {
            num = v;
            count = 1;
        } else {
            count++;
        }

        if (count > max) {
            max = count;
            mode = num;
        }
    });
    if (max == 1) {
        mode = false;
    }
    return mode;
};