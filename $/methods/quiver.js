sb.include('math.rand');
/**
 * @name sb.$.methods.quiver
 * @author Paul Visco
 * @description Makes an element shake and quiver
 * @returns {Function}  function to stop quiver
 * @function
 * @example 
 * $('#id').quiver();
 * $('#id').quiver().stop();
 */
sb.$.methods.quiver = function(params) {
    if(!this[0]){
        return false;
    }
    
    var el = this[0];
    params = params || {};

    var distance = params.distance || 5;
    var self = this;

    if (!el.isQuivering) {
        el.isQuivering = 1;

        var x = this.getX();
        var y = this.getY();

        var z = el.style.zIndex || 999;
        var position = (self.getStyle('position') == 'absolute') ? 'absolute' : 'relative';
        self.setStyle('position', position);
        el.interval = window.setInterval(function() {

            var left = sb.math.rand(0, distance);
            var top = sb.math.rand(0, distance);
            left += (position == 'absolute') ? x : 0;
            top += (position == 'absolute') ? y : 0;

            self.styles({
                left: left + 'px',
                top: top + 'px',
                zIndex: z,
                position: position
            });
        }, 10);
    }

    return {
        stop: function() {

            if (self.isQuivering) {
                window.clearTimeout(self.interval);
                self.isQuivering = 0;
            }
        }
    };
};