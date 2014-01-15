/**
 * @name sb.strings.stripBlankHTML
 * @param {String} str Removes blank HTML tags
 * @function
 * @example
 * sb.strings.removeBlankHTML('hello<b></b>world');
 * //'helloworld'
 */
sb.strings.stripBlankHTML = function(str) {
    return str.replace(/<(\w*)\s*[^\/>]*>\s*<\/\1>/g, '');
};