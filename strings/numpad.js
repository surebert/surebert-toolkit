/**
 * @name sb.strings.numpad
 * @author Paul Visco
 * @description Pads all numbers under 9 with a zero on the left
 * @param {String} str The string to pad
 * @returns {string} The original number padded to left with zero
 * @function
 * @example 
 * sb.strings.numpad("9;");
 * //'09'
 */
sb.strings.numpad = function(str) {
    str = String(str);
    return (str <= 9) ? '0' + str : str;
};