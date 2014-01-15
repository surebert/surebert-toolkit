/**
 * @name sb.$.methods.flashBg
 * @author Paul Visco
 * @description Flashes the background color with another color for a timeout to show activity e.g. save, delete
 * @param {String} color The color to flash
 * @returns {Number} timeout The time to wait before returning in ms
 * @function
 * @example 
 * $('#thing').flashBg('red');
 */
sb.$.methods.flashBg = function(color, timeout) {
    this.forEach(function(el) {
        timeout = timeout || 1000;

        el.style.backgroundColor = color;
        window.setTimeout(function() {
            el.style.backgroundColor = '';
        }, timeout);
    });
    
    return this;
};