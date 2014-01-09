sb.include('effect');
sb.include('Element.prototype.cssTransition');
sb.include('strings.toNumber');

/**
@Name:  Element.prototype.resizeTo
@Author: Paul Visco
@Version: 1.0 11/19/07
@Description: This effect resizes an element dynamically
@Param: integer width The width to resize to
@Param: integer height The height to resize to
@Param: integer duration The time milliseconds to fade over
Example: div.resizeTo({height:700, width:700});
*/
Element.prototype.resizeTo = function(o){
	
	var border = sb.strings.toNumber(this.getStyle('border'));
	var padding = sb.strings.toNumber(this.getStyle('padding'));
	this.style.overflow='hidden';
	
	var transitions = [];
	
	if(o.width !== undefined){
		var width = this.offsetWidth;
		transitions.push({
			prop : 'width',
			begin : width,
			change : o.width-width,
			onEnd : o.onWidthChanged || 0
		});
	}
	
	if(o.height !== undefined){
		
		var height = this.offsetHeight;
		
		transitions.push({
			prop : 'height',
			begin : height,
			change : o.height-height,
			onEnd : o.onHeightChanged || 0
		});
	}
	
	if(this.resizing){
		this.resizing.stop();
	}
	this.resizing = this.cssTransition(transitions, o.duration || 48);
	
	
	this.resizing.start();
	return this.resizing;
	
};