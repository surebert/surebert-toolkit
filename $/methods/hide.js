/**
 * @name sb.$.methods.hide
 * @author Paul Visco
 * @description Switches an object's display to hidden
 * @returns {Object} self, the $ selection it was called on
 * @function
 * @example 
 * myElement.toggle();
 */
sb.$.methods.hide = function() {
    this.forEach(function(el) {
        if (el.style) {
            el.style.display = 'none';
        }
    });

    return this;
};