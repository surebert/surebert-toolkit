/**
@Name: sb.strings.basename
@Author: Paul Visco
@Description: Grabs the basename from a url
@Return: String The filename part of the original string
@Example:
var myString = 'http://www.google.com/logo.gif';
var newString = sb.strings.basename(myString);
//newString = 'logo.gif';

*/
sb.strings.basename = function(str){
	var re = new RegExp("/\\/", "g");
	var str = str.replace(re, "/");
	var filename=str.split("/");
	return filename[(filename.length - 1)];
};