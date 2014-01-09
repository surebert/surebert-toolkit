/**
 * @name sb.strings.basename
 * @author Paul Visco
 * @description Grabs the basename from a url
 * @param {String} str The full URL
 * @returns {string} The filename part of the original string
 * @function
 * @example 
 * sb.strings.basename('http://www.google.com/logo.gif');
 * //'logo.gif';
 */
sb.strings.basename = function(str) {
    var re = new RegExp("/\\/", "g");
    var str = str.replace(re, "/");
    var filename = str.split("/");
    return filename[(filename.length - 1)];
};