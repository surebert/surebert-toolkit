/**
 * @name sb.strings.escapeHTML
 * @author Paul Visco
 * @description Escapes < and > with &lt; and &gt;
 * @param {String} str The orig string
 * @returns {string} with escaped < and >
 * @function
 * @example 
 * sb.strings.escapeHTML('<p>hello</p>');
 * //'&lt;p&gt;hello&lt;/p&gt;'
 */
sb.strings.escapeHTML = function(str) {
    str = str.replace(/</g, '&lt;');
    return str.replace(/>/g, '&gt;');
};