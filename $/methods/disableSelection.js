/**
 * @name sb.$.methods.disableSelection
 * @author Paul Visco
 * @description disables selection of the elements in the array
 * @returns {Object} self, the $ selection it was called on
 * @function
 * @example 
 * $("#id").disableSelection()
 */
sb.$.methods.disableSelection = function() {

    this.forEach(function(el) {
        el.onselectstart = function() {
            return false;
        };
        el.unselectable = "on";
        el.style.MozUserSelect = "none";

    });

    return this;
};