/**
 * @name sb.strings.stripWhitespace
 * @description Removes all whitespace from a string
 * @param {String} str String containing whitespace
 * @return {String} The string without any whitespace
 * @function
 * @example
 * sb.strings.stripWhitespace.stripWhitespace('hello world on earth');
 * //'helloworld'
 */
sb.strings.stripWhitespace = function(str) {
    return str.replace(new RegExp("\\s", "g"), "");
};