/**
 * @name sb.arrays.inject
 * @author Paul Visco
 * @description Injects a value into an array at a certain position
 * @param {Array} arr val The value to inject into the array. 
 * @param {number} index The index to place the value at, starts at 0
 * @param {*} val The value to inject into the array. 
 * @returns {Array} The array with value injected
 * @function
 * @example 
 * sb.arrays.inject(['zero', 'one', 'two'], 1, 'bagel');
 //['zero', 'bagel', 'one', 'two'];
 */
sb.arrays.inject = function(arr, index, val) {
    if (index < 0) {
        return arr;
    }
    var a = arr.slice(0, index), b = arr.splice(index, arr.length - index);

    a[index] = val;
    return a.concat(b);
};