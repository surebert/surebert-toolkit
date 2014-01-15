/**
 * @name sb.strings.toNumber
 * @description Converts a numeric string into an integer or float
 * @param {String} num The number to convert to a integer or float
 * @return {Number} If the original value is an interger, an integer value is returned, otherwise float
 * @function
 * @example
 * sb.strings.toNumber('12') +2;
 * //14 - without running toNumber it would return '122'
 * sb.strings.toNumber('12.4') +2;
 * //14.4 - without running toNumber it would return '12.42'
 */
sb.strings.toNumber = function(num) {
    if (num.match(/\./)) {
        return parseFloat(num, 10);
    } else {
        return parseInt(num, 10);
    }
};