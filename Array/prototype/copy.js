/**
@Name: Array.prototype.copy
@Author: Paul Visco
@Version: 1.1 11/19/07
@Description: Makes a new independent copy of an array instead of a pointer to it
@Return: Array A new array with the same value as the one it is making a copy of
@Example:
var myNewArray = myArray.copy();
*/
Array.prototype.copy = function(){
	return this.filter(function(){return true;});
};