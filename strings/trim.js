/**
 * @name sb.strings.trim
 * @description Trims a string of whitespace on both sides
 * @param {String} str The string to trim
 * @return {String} Orig string without whitespace on both sides
 * @function
 * @example
 * sb.strings.trim(' hello world ');
 * //'hello world'
 */
sb.strings.trim = function(str) {
    return str.replace(/(^\s+|\s+$)/g, '');
};