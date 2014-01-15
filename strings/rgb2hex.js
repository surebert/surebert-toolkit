/**
 * @name sb.strings.rgb2hex
 * @author Paul Visco
 * @description Takes an rgb string and converts it to hex color rgb(255,255,255) -> #FFFFFF
 * @param {String} str A hex color string
 * @param {Boolean} asArray if true then returns array
 * @returns {(String, String[])} the hex value or an array of hex 3 hex values 
 * for rgb #FFFFFF or ['FF', 'FF', 'FF']
 * @function
 * @example 
 * sb.strings.rgb2hex('rgb(255,255,255)');
 * //'09'
 */
sb.strings.rgb2hex = function(str, asArray) {

    if (!str.match(/^rgb/i)) {
        return false;
    }

    var re = new RegExp('rgb\\((\\d{1,}),(\\d{1,}),(\\d{1,})\\)', "ig");
    var colors = re.exec(str.replace(new RegExp("\\s", "g"), ""));
    var r = parseInt(colors[1], 10).toString(16);
    var g = parseInt(colors[2], 10).toString(16);
    var b = parseInt(colors[3], 10).toString(16);

    r = (r.length < 2) ? r + r : r;
    g = (g.length < 2) ? g + g : g;
    b = (b.length < 2) ? b + b : b;

    if (asArray) {
        return [r, g, b];
    } else {
        return '#' + r + '' + g + '' + b;
    }
};