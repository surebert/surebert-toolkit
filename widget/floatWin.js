sb.include('Element.prototype.makeDraggable');
sb.include('Element.prototype.getDimensions');
sb.include('Element.prototype.getWidth');
sb.include('Element.prototype.getHeight');
sb.include('Element.prototype.getPosition');
sb.include('Element.prototype.mv');
sb.include('Element.prototype.mv');
sb.include('Element.prototype.wh');
sb.include('Element.prototype.hide');
sb.include('Element.prototype.show');
sb.include('Element.prototype.isWithin');

/**
@Name: sb.floatWin
@Description: Used to create floating internal windows
@Param: Object params
@Example:
*/
sb.widget.floatWin = function(params){

	sb.objects.infuse(params, this);
	this.positionType = this.positionType || 'absolute';
	this.createBox();
};
sb.widget.floatWin.winCount = 0;
sb.widget.floatWin.createHub = function(){

	this.hub = new sb.element({
		tag : 'div',
		id : 'sb_floatwin_hub'
	});

	this.hub.html('');
	this.hub.styles({
		position : 'fixed',
		bottom : '0px',
		right : '0px',
		zIndex : 30001
	});
	this.hub.appendTo('body');

	this.fullScreen = new sb.element({
		tag : 'div',
		styles : {
			position:'fixed',
			top : '0px',
			left : '0px',
			width : '100%',
			height : '100%',
			display : 'none',
			zIndex : 9999
		}
	});
	this.fullScreen.appendTo('body');
};

sb.widget.floatWin.prototype = {
	createBox : function(e){
		if(!sb.widget.floatWin.hub){
			sb.widget.floatWin.createHub();
		}
		var self = this;
		this.win = new sb.element({
			tag : 'div',
			className : 'sb_floatWin '+this.className || ''
		});

		this.titleBar = new sb.element({
			tag : 'div',
			className : 'sb_floatWinTitleBar dragHandle',
			title : 'Drag me to move window',
			onselectstart : function() {
				return false;
			},
			unselectable : "on",
			styles : {
				cursor: 'e-resize',
				MozUserSelect : 'none'
			}
		});

		this.titleIcons = new sb.element({
			tag : 'div',
			className : 'sb_floatWinTitleIcons',
			styles : {
				cssFloat : 'right',
				styleFloat : 'right',
				textAlign : 'right'
			}
		});

		this.titleText = new sb.element({
			tag : 'div',
			className : 'sb_floatWinTitleText dragHandle',
			innerHTML : 'title'
		});

		this.content = new sb.element({
			tag : 'div',
			className : 'sb_floatWinContent',
			styles : {
				width : '100%'
			}
		});

		this.win.events({
			click : function(e){
				var target = e.target;

				self.onClick(e);
				if(target.isWithin(self.content)){
					self.onContentClick(e);
				} else {

					if(target.isWithin(self.titleBar)){
						self.onTitleBarClick(e);
					}
					if(target.nodeName == 'IMG' && target.isWithin(self.titleIcons)){
						self.onIconClick(e);
					}
					
				}

			},
			dblclick : function(e){
				if(self.minimizable){
					var target = e.target;

					self.onDblClick(e);

					if(target.isWithin(self.titleBar)){
						self.onTitleBarDblClick(e);
					}
				}

			}
		});

		this.titleBar.appendTo(this.win);
		this.titleIcons.appendTo(this.titleBar);
		this.titleText.appendTo(this.titleBar);
		this.content.appendTo(this.win);
		this.win.makeDraggable();
		this.win.ondragstop = function(e, pos){
			if(e.clientY < 0){
				self.win.style.top = 0;
			}
			if(typeof self.onDragStop === 'function'){
				self.onDragStop(e);
			}
		};

		if(this.closeButton){
			this.closeButton = this.addIcon(new sb.element({
				tag : 'img',
				src : sb.base+'_media/close.png',
				title : 'Click to close',
				events : {
					click : function(e){
						self.close(e);
					}
				}
			}));
			if(this.minimizable){
				
				this.downButton = this.addIcon(new sb.element({
					tag : 'img',
					src : sb.base+'_media/down.png',
					title : 'Click minimize',
					events : {
						click : function(e){
							self.minimize(e);
						}
					}
				}));

				this.upButton = this.addIcon(new sb.element({
					tag : 'img',
					src : sb.base+'_media/up.png',
					title : 'Click restore',
					events : {
						click : function(e){
							self.restore(e);
						}
					}
				}));
			}
		}

		if(typeof this.title =='string'){
			this.setTitle(this.title);
		}

		this.win.style.zIndex = 900+sb.widget.floatWin.winCount;
		sb.widget.floatWin.winCount++;
		this.win.style.position = this.positionType;
		this.win.appendTo(this.parentNode || document.body);

	},

	closeButton : true,

	shade : function(){
		
		if(this.shaded){

			this.content.style.display = '';
			this.shaded=0;

		} else {

			this.content.style.display = 'none';
			this.shaded=1;
		}
	},

	addContent : function(content){
		var typ = sb.typeOf(content);
		if(typ == 'string'){
			this.content.innerHTML = content;
		} else if(typ =='sb.element'){
			content.appendTo(this.content);
		}
	},

	setContent : function(content){
		var typ = sb.typeOf(content);
		if(typ == 'string'){
			this.content.innerHTML = content;
		} else if(typ =='sb.element'){
			content.appendTo(this.content);
		}
	},

	addIcon : function(el){

		if(sb.typeOf(el)=='sb.element'){
			el.win=this;
			el.style.cursor = 'pointer';
			return el.appendToTop(this.titleIcons);
		} else if(sb.typeOf(el) == 'string'){
			return new sb.element({tag : 'img', src : el}).appendToTop(this.titleIcons);
		}
	},

	clearContent : function(){
		this.content.innerHTML ='';
	},

	close : function(e){
		this.onClose(e);
		this.win.hide(e);
		this.win.remove(e);
	},

	show : function(e){
		if(this.win.isFullScreen){
			return;
		}
		this.win.appendTo(this.parentNode || document.body);
		this.win.show();
		this.titleText.style.backgroundColor = this.titleBar.getStyle('backgroundColor');
		if(e && e.pageX){
			var x = e.pageX-20;
			x = x > 0 ? x : 0;
			var y = e.pageY-20;
			y = y > 0 ? y : 0;
			this.win.style.left = x+'px';
			this.win.style.top = y+'px';
		}
		this.onDisplay();
	},

	restore : function(){
		
		if(!this.minimized && !this.isFullScreen){
			this.fullScreen();
			return;
		}
		this.win.makeDraggable();
		this.minimized = false;
		this.win.appendTo(this.parentNode || document.body);
		this.win.style.position = this.positionType;
		if(this.shaded){
			this.shade();
		}

		if(typeof this.onAfterRestore === 'function'){
			this.onAfterRestore();
		}
	},
	
	minimize : function(){
		if(this.isFullScreen){
			this.unFullScreen();
		}
		this.win.appendTo(sb.widget.floatWin.hub);
		this.win.makeUnDraggable();
		this.minimized = true;
		this.win.style.width = '250px';
		this.win.style.position = 'static';
		
		this.shade();
	},
	fullScreen : function(){

		if(sb.widget.floatWin.fullScreen.$('div').length() == 0){

			this.win.appendTo(sb.widget.floatWin.fullScreen);
			this.win.style.position = 'static';
			this.win.style.width = '100%';
			this.win.style.height = '100%';
			this.win.makeUnDraggable();
			sb.widget.floatWin.fullScreen.style.display = 'block';
			$('html').style.overflow = 'hidden';
			this.isFullScreen = true;
			if(typeof this.onAfterFullScreen === 'function'){
				this.onAfterFullScreen();
			}
			return true;
		} else {
			alert("Only one window can be full screen at a time");
			return false;
		}
	},

	unFullScreen : function(){
		$('html').style.overflow = '';
		
		this.restore();
		this.win.makeDraggable();
		sb.widget.floatWin.fullScreen.style.display = 'none';
		this.win.style.width = '';
		this.win.style.height = '';
		//this.win.style.overflow ='';
		this.isFullScreen = false;
		if(typeof this.onAfterUnFullScreen === 'function'){
			this.onAfterUnFullScreen();
		}

	},
	
	mv : function(x,y,z){
		this.win.mv(x,y,z);
	},
	
	wh : function(w,h){
		this.win.wh(w,h);
	},

	setTitle : function(txt){
		this.titleText.innerHTML=txt;
	},

	getTitle : function(){
		return this.titleText.innerHTML;
	},
	onTitleBarClick : function(e){},
	onContentClick : function(e){},
	onClick : function(e){},
	onDisplay : function(){},
	onIconClick : function(e){},
	onClose : function(e){},
	onTitleBarDblClick : function(e){},
	onDblClick : function(e){},
	onAfterFullScreen : function(){},
	onAfterUnFullScreen : function(){}
};

