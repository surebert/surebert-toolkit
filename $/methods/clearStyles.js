/**
 * @name sb.$.methods.clearStyles
 * @author Paul Visco
 * @description Clears any styles set for the DOM element by javascript
 * @returns {Object} self, the $ selection it was called on
 * @function
 * @example 
 * var th  = $("#thing");
 * th.styles({height : '1000px'});
 * th.clearStyles();
 */
sb.$.methods.clearStyles = function() {
    this.forEach(function(el) {
        for (var style in el.style) {
            if (!sb.objects[style]) {
                try {
                    el.style[style] = '';
                } catch (e) {
                }
            }
        }
    });

    return this;
};