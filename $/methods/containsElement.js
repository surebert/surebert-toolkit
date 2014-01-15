/**
 * @name sb.$.methods.containsElement
 * @author Paul Visco
 * @description Checks if first element in selection contains the element past in
 * @param {String} b The other element to check if for
 * @function
 * @example
 * $('#myDiv').containsElement('#otherdiv');
 * 
 * @returns {Boolean}
 * 
 */
sb.$.methods.containsElement = function(b) {

    if (!this.length) {
        return false;
    }

    b = sb.$(b);
    if (!b || !b.length) {
        return false;
    }

    b = b[0];

    var el = this[0];

    return el.contains ?
            el != b && el.contains(b) :
            !!(el.compareDocumentPosition(b) & 16);
};