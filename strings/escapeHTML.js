/**
@Name: sb.strings.escapeHTML
@Author: Paul Visco
@Description: Checks to see if a string is empty or not
@Return: Escapes < and >
@Example:
var str = '<p>hello</p>';
var newString = sb.strings.escapeHTML(str);
//newString = '&lt;p&gt;hello&lt;/p&gt;'
*/
sb.strings.escapeHTML = function(str){
	str = str.replace(/</g, '&lt;');
	return str.replace(/>/g, '&gt;');
};