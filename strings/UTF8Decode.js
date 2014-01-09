/**
 * @name sb.strings.UTF8Decode
 * @author Paul Visco - Adapted/Taken from http://www.webtoolkit.info/
 * @description decodes UTF8
 * @param {String} str The string to decode
 * @returns {string} the UTF8 decoded string
 * @function
 * @example 
 * sb.strings.UTF8Decode(str);
 */
sb.strings.UTF8Decode = function(str) {

    var utftext = str;
    var string = "";
    var i = 0;
    var c = 0, c2 = 0, c3 = 0;

    while (i < utftext.length) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if ((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
};