/**
@Name: sb.strings.htmlspecialchars
@Author: Paul Visco
@Description: Escapes same chars as PHP htmlspecialchars
@Return: Boolean Returns true if the string is empty, false otherwise
@Example:
var str = '<p>hello</p>';
var newString = sb.strings.htmlspecialchars(str);
//newString = '&lt;p&gt;hello&lt;/p&gt;'
*/
sb.strings.htmlspecialchars = function(str){
    var s = str.replace(/&/g, '&amp;');
    s = s.replace(/'/g, "&#039;");
    s = s.replace(/"/g, '&quot;');
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    return s;
};