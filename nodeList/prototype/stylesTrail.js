/**
@Name: sb.nodeList.prototype.stylesTrail
@Description: Cahnegs the styles of a nodelist in order that they appear in the nodelist on a timeout, and then changes the styles back to how their were
@Example:
$('li').stylesTrail({
	styles : {
		backgroundColor : 'orange',
		borderColor : 'red',
		borderWidth : '2px'
	},
	offset : 6,
	offsetOff : 80,
	onEnd : function(){
		
	}
});
 */

sb.nodeList.prototype.stylesTrail = function(params){
  
	var prop,styles = params.styles || {backgroundColor : 'orange'};
	var offset = params.offset || 300;
	var offsetOff = params.offsetOff || 80;
	
	var i = 0; 
	var count = this.length;
	var j = 0;
	var t = this;
	
	
	this.forEach(function(el){
		el._origStyles = {};
		for(prop in styles){
			if(styles.hasOwnProperty(prop)){
				el._origStyles[prop] = t.getStyle.call([el], prop);
			}
		}
		
		window.setTimeout(function(){
			for(prop in styles){
				if(styles.hasOwnProperty(prop)){
					t.setStyle.call([el], prop, styles[prop]);
				}
			}
			window.setTimeout(function(){
				for(prop in el._origStyles){
					if(styles.hasOwnProperty(prop)){
						t.setStyle.call([el], prop, el._origStyles[prop]);
					}
				}
				
				j++;
				
				if(j == count && typeof params.onEnd == 'function'){
					params.onEnd(t);
				}
			}, i+offset);
		}, i);
		
		i += offsetOff;
		
	});

	return this;
};