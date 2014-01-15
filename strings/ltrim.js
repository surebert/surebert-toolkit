/**
 * @name sb.strings.ltrim
 * @author Paul Visco
 * @description Trims all white space off the left side of a string
 * @param {String} str The orig string
 * @returns {String} The original text with whitespace removed from the left
 * @function
 * @example 
 * sb.strings.ltrim('   Hello');
 * //'hello';
 */
sb.strings.ltrim = function(str) {
    return str.replace(/^\s+/, "");
};