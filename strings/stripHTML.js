/**
 * @name sb.strings.stripHTML
 * @author Paul Visco
 * @description Removes all HTML tags from a string
 * @param {String} str The orig string
 * @returns {String} The original string without any HTML markup
 * @function
 * @example 
 * sb.strings.stripHTML('hello <p>doggy</p>');
 * //'hello doggy'
 */
sb.strings.stripHTML = function(str) {
    var re = new RegExp("(<([^>]+)>)", "ig");
    str = str.replace(re, "");
    var amps = ["&nbsp;", "&amp;", "&quot;"];
    var replaceAmps = [" ", "&", '"'];
    for (var x = 0; x < amps.length; x++) {
        str = str.replace(amps[x], replaceAmps[x]);
    }

    re = new RegExp("(&(.*?);)", "ig");
    str = str.replace(re, "");

    return str;
};