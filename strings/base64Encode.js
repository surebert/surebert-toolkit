sb.include('strings.UTF8Encode');
/**
 * @name sb.strings.base64Encode
 * @author Paul Visco - Adapted/Taken from http://www.webtoolkit.info/
 * @description encodes base64 strings
 * @param {String} str The string to encode
 * @returns {string} The base64 encoded string
 * @function
 * @example 
 * sb.strings.base64Decode('hello world');
 */
sb.strings.base64Encode = function(str) {
    var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    var input = sb.strings.UTF8Encode(str);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
                key.charAt(enc1) + key.charAt(enc2) +
                key.charAt(enc3) + key.charAt(enc4);

    }

    return output;
};