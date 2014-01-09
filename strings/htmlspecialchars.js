/**
 * @name sb.strings.htmlspecialchars
 * @author Paul Visco
 * @description Escapes same chars as PHP htmlspecialchars
 * @param {String} str The orig string
 * @returns {string} escaped html
 * @function
 * @example 
 * sb.strings.htmlspecialchars('<p>hello</p>');
 * //newString = '&lt;p&gt;hello&lt;/p&gt;'
 */
sb.strings.htmlspecialchars = function(str) {
    var s = str.replace(/&/g, '&amp;');
    s = s.replace(/'/g, "&#039;");
    s = s.replace(/"/g, '&quot;');
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    return s;
};