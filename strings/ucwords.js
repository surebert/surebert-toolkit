/**
 * @name sb.strings.ucwords
 * @description Converts all first letters of words in a string to uppercase.
 * @param {String} str The original string with all first letters of words converted to uppercase.
 * @return {String} Orig string without common typos
 * @function
 * @example
 * sb.strings.ucwords('hello world');
 * //'Hello World'
 */
sb.strings.ucwords = function(str) {
    return str.split(' ').map(function(v) {
        return v.charAt(0).toUpperCase() + v.slice(1, v.length);
    }).join(' ');
};