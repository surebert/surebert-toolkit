/**
 * @name sb.$.methods.clearPosition
 * @author Paul Visco
 * @description Clears any position data set with javascript
 * @returns {Object} self, the $ selection it was called on
 * @function
 * @example
 * $('#myDiv').clearPosition();
 */
sb.$.methods.clearPosition = function(){
    this.styles({
            position : '',
            zIndex: '',
            left : '',
            top: '',
            backgroundColor : 'red'
    }); 
    return this;
};