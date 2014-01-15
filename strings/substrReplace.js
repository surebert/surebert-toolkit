/**
 * @name sb.strings.substrReplace
 * @description Mimics php substrReplace replacing part of the string with another string from an index to a length
 * @param {String} str The orig string to replace parts of
 * @param {String} replaceWith The string to replace with
 * @param {Number} start The index to start at
 * @param {Number} length The length to replace
 * @return {String} The string with the replacement
 * @function
 * @example
 * sb.strings.substrReplace('hello world', 'girl', 0, 4)
 * //'girlo world';
 */
sb.strings.substrReplace = function(str, replaceWith, start, length) {
    return str.replace(str.substring(start, (start + length)), replaceWith);
};