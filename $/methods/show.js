/**
 * @name sb.$.methods.show
 * @author Paul Visco
 * @description Shows the element
 * @returns {Object} self, the $ selection it was called on
 * @function
 * @example 
 * $('#id').show();
 */
sb.$.methods.show = function() {
    var self = this
    this.forEach(function(el) {
        try {
            el.style.display = el.style.display == 'none' ? 'block' : el.style.display;
        } catch (e) {
            el.style.display = 'block';
        }
    });

    return this;
};