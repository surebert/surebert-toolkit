/**
 * @name sb.$.methods.toggle
 * @author Paul Visco
 * @description Switches an object's display between hidden and default
 * @returns {Object} self, the $ selection it was called on
 * @function
 * @example 
 * myElement.toggle();
 */
sb.$.methods.toggle = function() {
    this.forEach(function(el) {
        if (el.style) {
            el.style.display = (el.style.display === 'none') ? '' : 'none';
        }
    });

    return this;
};