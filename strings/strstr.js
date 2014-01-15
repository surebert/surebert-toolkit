/**
 * @name sb.strings.strstr
 * @description Returns true if the substring is found in the string
 * @param {String} needle The substring to search for within the string
 * @param {String} haystack The string to search for substring within
 * @return {Boolean} True if the string is found and false if it isn't
 * @function
 * @example
 * myString.strstr('hello world', 'world')
 * //true
 */
sb.strings.strstr = function(haystack, needle) {
    var f = haystack.indexOf(needle) + 1;
    return (f === 0) ? 0 : 1;
};