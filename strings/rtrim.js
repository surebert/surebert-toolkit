/**
 * @name sb.strings.rtrim
 * @author Paul Visco
 * @description Trims all white space off the right side of a string
 * @param {String} str The orig string
 * @returns {String} The original text with whitespace removed from the right
 * @function
 * @example 
 * sb.strings.rtrim('Hello   ');
 * //'hello';
 */
sb.strings.rtrim = function(str) {
    return str.replace(/\s+$/, "");
};