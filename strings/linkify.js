/**
 * @name sb.strings.linkify
 * @author Paul Visco
 * @description Converts all URLs in a text block into actual html links
 * @param {String} str The orig string
 * @param {String} target The target to open the links in, defaults to blank
 * @returns {String} The original text withe links converted to HTML
 * @function
 * @example 
 * sb.strings.linkify('Here http://www.surebert.com is a great javascript toolkit');
 * //'Here <a href="http://www.surebert.com" target="_blank">::link::</a> is a great javascript toolkit';
 */
sb.strings.linkify = function(str, target) {
    target = target || '_blank';
    var match_url = new RegExp("(\s|\n|)([a-z]+?):\/\/([a-z0-9\-\.,\?!%\*_\#:;~\\&$@\/=\+]+)", "i");
    return str.replace(match_url, "<a href=\"$2://$3\" title=\"$2://$3\" target=\"" + target + "\">::link::</a>");
};