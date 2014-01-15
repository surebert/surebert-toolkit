/**
 * @name sb.strings.parseHTML
 * @author Paul Visco
 * @description Parses HTML to for sb.widget.editor dataOut and viewSource methods.
 * @param {String} str The orig string
 * @returns {Boolean} basicOnly Removes all non basic html is basicOnly =1
 * @function
 * @example 
 * sb.strings.parseHTML(str);
 */
sb.strings.parseHTML = function(html, basicOnly) {

    html = html.replace(/<(.*?)>/g, function(m) {
        return m.toLowerCase();
    });

    //remove word crap
    html = sb.strings.stripWordHTML(html);

    //strip extra line returns?
    html = html.replace(/\n+/g, "\n");
    html = html.replace(/class=([^"].*?)>/ig, 'class="$1">');

    if (basicOnly == true) {

        html = html.replace(/<br>/g, "<br />");
        html = html.replace(/<hr.*?>/g, "<hr />");
        html = html.replace(/<hr \/>/g, "\[hr /\]");
        html = html.replace(/<br \/>/g, "\[br /\]");
        html = html.replace(/<(\/?)strong>/g, "<$1b>");
        html = html.replace(/<(\/?)em>/g, "<$1i>");

        html = html.replace(/<(\/?)sub>/g, "\[$1sub\]");
        html = html.replace(/<(\/?)sup>/g, "\[$1sup\]");
        html = html.replace(/<(\/?)ol>/g, "\[$1ol\]");
        html = html.replace(/<(\/?)li>/g, "\[$1li\]");
        html = html.replace(/<(\/?)p>/g, "\[$1p\]");
        html = html.replace(/<(\/?)strikethrough>/g, "\[$1li\]");

        html = html.replace(/<(\/?)u>/g, "\[$1u\]");
        html = html.replace(/<(\/?)i>/g, "\[$1i\]");
        html = html.replace(/<(\/?)b>/g, "\[$1b\]");
        html = html.replace(/<(\/?)p>/g, "\[$1p\]");

        //strip all other html
        html = sb.strings.stripHTML(html);

        //return all html
        html = html.replace(/\[(\/?)p\]/g, "<$1p>");
        html = html.replace(/\[(\/?)u\]/g, "<$1u>");
        html = html.replace(/\[(\/?)i\]/g, "<$1i>");
        html = html.replace(/\[(\/?)b\]/g, "<$1b>");
        html = html.replace(/\[(\/?)p\]/g, "<$1p>");
        html = html.replace(/\[(\/?)sub\]/g, "<$1sub>");
        html = html.replace(/\[(\/?)sup\]/g, "<$1sup>");
        html = html.replace(/\[(\/?)ol\]/g, "<$1ol>");
        html = html.replace(/\[(\/?)li\]/g, "<$1li>");
        html = html.replace(/\[hr \/\]/g, "<hr />");
        html = html.replace(/\[br \/\]/g, "<br />");
        html = html.replace(/\[(\/?)strikethrough\]/g, "<$1strikethrough>");

    }
    //remove blank html
    html = sb.strings.stripBlankHTML(html);
    html = sb.strings.stripHTMLComments(html);

    return html;

};