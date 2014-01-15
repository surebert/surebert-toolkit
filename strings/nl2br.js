/**
 * @name sb.strings.nl2br
 * @author Paul Visco
 * @description Replaces all new line "\n" with HTML break tags "<br />"
 * @param {String} str The string to replace the new lines in
 * @returns {string} The string with new lines replaced with break tags
 * @function
 * @example 
 * sb.strings.nl2br("hello\nworld");
 * //'hello<br />world';
 */
sb.strings.nl2br = function(str) {
    var re = new RegExp("\n", "ig");
    return str.replace(re, "<br />");
};