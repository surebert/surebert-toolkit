/**
 * @name sb.strings.UTF8Encode
 * @author Paul Visco - Adapted/Taken from http://www.webtoolkit.info/
 * @description encodes UTF8
 * @param {String} str The string to encode
 * @returns {string} The UTF8 encoded string
 * @function
 * @example 
 * sb.strings.UTF8Encode(str);
 */
sb.strings.UTF8Encode = function(str) {

    str = str.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
};