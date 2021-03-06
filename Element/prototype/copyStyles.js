/**
@Name: Element.prototype.copyStyles
@Description: Used to copy style properties from one element to another
@Example:
myElement.copyStyles(myOtherElement);
*/
Element.prototype.copyStyles = function(from){
	from = sb.$(from);
	for(var prop in from.style){
		if(typeof(prop) == 'string'){
			try{this.style[prop] = from.style[prop];}catch(e){}
		}
	}
	return this;
};