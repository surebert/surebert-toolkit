/**
 * @name sb.strings.isNumeric
 * @author Paul Visco
 * @description Checks to see if a string is numeric (a float or number)
 * @param {String} str The orig string
 * @returns {Boolean} True if the the string represnts numeric data, false otherwise
 * @function
 * @example 
 * sb.strings.isNumeric('12')
 * //true
 */
sb.strings.isNumeric = function(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
};