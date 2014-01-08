/**
@Name: sb.strings.br2nl
@Author: Paul Visco
@Description: Converts HTML line breaks "<br />" to new lines "\n"
@Return: String The original string but replaces breaks with actual new lines
@Example:
var myString = 'hello<br />there';
var newString = sb.strings.br2nl(myString);
//newString = "hello\nthere";
*/
sb.strings.br2nl = function(str){
	var re = new RegExp("<[br /|br]>", "ig");
	return str.replace(re, "\n");
};