sb.include('sb.strings.UTF8Decode');

/**
 * @name sb.strings.base64Decode
 * @author Paul Visco - Adapted/Taken from http://www.webtoolkit.info/
 * @description decodes base64 strings
 * @param {String} str The string to decode
 * @returns {string} the base64 decoded string
 * @function
 * @example 
 * sb.strings.base64Decode('aGVsbG8gd29ybGQ=');
 */
sb.strings.base64Decode = function(str) {
    var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    var input = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = key.indexOf(input.charAt(i++));
        enc2 = key.indexOf(input.charAt(i++));
        enc3 = key.indexOf(input.charAt(i++));
        enc4 = key.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = sb.strings.UTF8Decode(output);

    return output;

};