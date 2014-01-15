/**
 * @name sb.strings.stripHTMLComments
 * @param {String} str The HTML string to strip comments from
 * @function
 * @example
 * sb.strings.stripHTMLComments(str);
 */
sb.strings.stripHTMLComments = function(str) {
    return str.replace(/<!(?:--[\s\S]*?--\s*)?>\s*/g, '');
};