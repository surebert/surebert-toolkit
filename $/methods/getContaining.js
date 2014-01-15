/**
 * @name sb.$.methods.getContaining
 * @author Paul Visco
 * @description Searches parentNodes incrementally till it find a node of a particular nodeName
 * @param {String} The containing nodeName to look for
 * @returns {Object} self, the $ selection it was called on
 * @function
 * @example
 * $('#myDiv').getContaining('div');
 */
sb.$.methods.getContaining = function(nodeName) {

    var ret = false;
    var parent = this[0];
    var nu = nodeName.toUpperCase();
    while (parent = parent.parentNode) {
        if (parent.nodeName && parent.nodeName == nu) {

            return parent;
        }
    }
    return ret;
};