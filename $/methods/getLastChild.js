/**
 * @name sb.$.methods.getFirstChild
 * @author Paul Visco
 * @description returns the last child element of a parentNode
 * @returns {Object} element that is the last child
 * @function
 * @example
 * $('#myDiv').getLastChild();
 */
sb.$.methods.getLastChild = function() {

    var node = this[0].lastChild;
    while (node && node.nodeType && node.nodeType == 3) {
        node = node.previousSibling;
    }
    return node;
};