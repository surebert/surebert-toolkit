/**
 * @name sb.strings.unhtmlspecialchars
 * @author Paul Visco
 * @description Undoes htmlspecialchars
 * @param {String} str The string to unescape
 * @returns {string} the string with HTML chars reinserted
 * @function
 * @example 
 * sb.strings.unhtmlspecialchars('&lt;p&gt;hello&lt;/p&gt;');
 * //'<p>hello</p>'
 */
sb.strings.unhtmlspecialchars = function(str) {
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&#039;/g, "'");
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    return str;
};