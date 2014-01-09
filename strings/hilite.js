/**
 * @name sb.strings.hilite
 * @author Paul Visco
 * @description Hilites a string within a text block
 * @param {String} str The orig string
 * @param {String} needle The text to find
 * @param {String} className The className to use for hiliting overrides default yellow background style
 * @returns {string} with the needle underlied and hilited
 * @function
 * @example 
 * sb.strings.hilite('There was a dog on earth', 'dog');
 * //'There was a <u style="backgroundColor:yellow;">dog</u> on earth';
 */
sb.strings.hilite = function(str, needle, className) {
    className = (typeof className != 'undefined') ? ' class="' + className + '" ' : ' style="background-color:yellow;" ';
    return str.replace(new RegExp("(" + needle + ")", "ig"), "<u " + className + ">$1</u>");
};