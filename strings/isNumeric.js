/**
@Name: sb.strings.isNumeric
@Author: Paul Visco
@Description: Checks to see if a string is numeric (a float or number)
@Return: Boolean True if the the string represnts numeric data, false otherwise
@Example:
var str = '12';

var answer = sb.strings.isNumeric(str);
//answer = true
*/
sb.strings.isNumeric = function(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
};