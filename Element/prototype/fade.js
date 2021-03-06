sb.include('effect');
sb.include('Element.prototype.setOpacity');
/**
@Name:  Element.prototype.fade
@Author: Paul Visco
@Version: 1.1
@Description: This effect is used to fade a dom element's opacity
@Param: integer percent The opacity to end at between 0 and 100%
@Param: integer duration The time milliseconds to fade over
Example: 
//fades to 20% with a duration of 24 milliseconds and alert 'done' when done
var fade = $('#myDiv').fade({percent : 20, duration : 24, onEnd : function(){
	alert('done');
}});

//fades back to 80% after two seconds
window.setTimeout(function(){
	fade({percent : 20, duration : 24});
}, 2000);
*/
Element.prototype.fade = function(o){
	o = o || {};
	//percent, duration, onEnd
	var effect = new sb.effect({
		el : this,
		onChange : function(){
			this.el.setOpacity(Math.round(this.value)/100);
		}
	});
	
	var fadeTo = function(o){
			effect.duration = o.duration || 24;
			effect.begin = (typeof effect.el.style.opacity =='undefined' || effect.el.style.opacity ==='') ? 100 : effect.el.style.opacity*100; 
			
			effect.onEnd = o.onEnd || 0;
			
			if(typeof o.percent =='number'){
				effect.change = o.percent-effect.begin;
			} else {
				effect.change = -1*effect.begin;
			}
			effect.tween = (effect.change < 0) ? 'outQuart' : 'inQuart';
			
			effect.restart();
			return fadeTo;
	};
	
	fadeTo(o);
	return fadeTo;
	
};