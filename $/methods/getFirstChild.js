/**
 * @name sb.$.methods.getFirstChild
 * @author Paul Visco
 * @description returns the first child element
 * @returns {Object} element that is the first child
 * @function
 * @example
 * $('#myDiv').getFirstChild();
 */
sb.$.methods.getFirstChild = function() {
    var node = this[0].firstChild;
    while (node && node.nodeType && node.nodeType == 3) {
        node = node.nextSibling;
    }
    return node;
};