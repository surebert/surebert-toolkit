/**
 * @name sb.strings.stripWordHTML
 * @author Paul Visco
 * @description Strips word HTML from a string. The following function is a slight variation of the word cleaner code posted by Weeezl (user @ InteractiveTools forums).
 * @param {String} str The orig string
 * @returns {String} The original text with word html removed
 * @function
 * @example 
 * sb.strings.stripWordHTML(str);
 */
sb.strings.stripWordHTML = function(str) {

    if (str.indexOf('class="mso') >= 0 || str.indexOf('class=mso') >= 0) {

        // make one line
        str = str.replace(/\r\n/g, ' ').
                replace(/\n/g, ' ').
                replace(/\r/g, ' ').
                replace(/\&nbsp\;/g, ' ');

        // keep tags, strip attributes
        str = str.replace(/ class=[^\s|>]*/gi, '').
                //replace(/<p [^>]*TEXT-ALIGN: justify[^>]*>/gi,'<p align="justify">').
                replace(/ style=\"[^>]*\"/gi, '').
                replace(/ align=[^\s|>]*/gi, '');

        //clean up tags
        str = str.replace(/<b [^>]*>/gi, '<b>').
                replace(/<i [^>]*>/gi, '<i>').
                replace(/<li [^>]*>/gi, '<li>').
                replace(/<ul [^>]*>/gi, '<ul>');

        // replace outdated tags
        str = str.replace(/<b>/gi, '<strong>').
                replace(/<\/b>/gi, '</strong>');

        // mozilla doesn't like <em> tags
        str = str.replace(/<em>/gi, '<i>').
                replace(/<\/em>/gi, '</i>');

        // kill unwanted tags
        str = str.replace(/<\?xml:[^>]*>/g, '').// Word xml
                replace(/<\/?st1:[^>]*>/g, '').// Word SmartTags
                replace(/<\/?[a-z]\:[^>]*>/g, '').// All other funny Word non-HTML stuff
                replace(/<\/?font[^>]*>/gi, '').// Disable if you want to keep font formatting
                replace(/<\/?span[^>]*>/gi, ' ').
                replace(/<\/?div[^>]*>/gi, ' ').
                replace(/<\/?pre[^>]*>/gi, ' ').
                replace(/<\/?h[1-6][^>]*>/gi, ' ');

        //remove empty tags
        //str = str.replace(/<strong><\/strong>/gi,'').
        //replace(/<i><\/i>/gi,'').
        //replace(/<P[^>]*><\/P>/gi,'');

        // nuke double tags
        var oldlen = str.length + 1;
        while (oldlen > str.length) {
            oldlen = str.length;
            // join us now and free the tags, we'll be free hackers, we'll be free... ;-)
            str = str.replace(/<([a-z][a-z]*)> *<\/\1>/gi, ' ').
                    replace(/<([a-z][a-z]*)> *<([a-z][^>]*)> *<\/\1>/gi, '<$2>');
        }
        str = str.replace(/<([a-z][a-z]*)><\1>/gi, '<$1>').
                replace(/<\/([a-z][a-z]*)><\/\1>/gi, '<\/$1>');

        // nuke double spaces
        str = str.replace(/  */gi, ' ');

    }
    return str;
};
