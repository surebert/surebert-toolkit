/**
 * @name sb.strings.br2nl
 * @author Paul Visco
 * @description Converts HTML line breaks "<br />" to new lines "\n"
 * @param {String} str The orig string with line returns
 * @returns {string} The original string but replaces breaks with actual new lines
 * @function
 * @example 
 * sb.strings.br2nl('hello<br />there');
 * //"hello\nthere";
 */
sb.strings.br2nl = function(str) {
    var re = new RegExp("<[br /|br]>", "ig");
    return str.replace(re, "\n");
};