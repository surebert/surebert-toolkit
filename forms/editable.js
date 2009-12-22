sb.forms.editable = {};
sb.include('Element.prototype.isWithin');
/**
@Name: sb.forms.editable.text
@Description: Creates a click to edit text block
@Param: Object
type string input or textarea
onBeforeEdit function Fires before editing begins,  Can be used to load raw text wihtout HTML from server
onSave function Fires after save, send back to server, stop editing
className string the classname for the widget, defaults to

@Example:
//use the following in a dblclick event for the text you want to make editable

var editor = sb.forms.editable.text({
	element : e.target,
	type : 'textarea',
	onBeforeEdit : function(){},
	onSave : function(value){}
});

editor.edit();

//example CSS
.sb_forms_editable textarea{
	cursor:text;
	display:block;
	width:97%;
	height:100px;
	overflow:auto;
	font-family:tahoma;
	font-size:1.1em;
}

//if its an editbar for an input
.sb_forms_editable editbar.input{
	margin-left:5px;
}

//if its an editbar for a textarea
.sb_forms_editable editbar.input{
	display:block;
	text-align:right;
}

.sb_forms_editable button{
	background-color:#d88713;
	color:#7c4e0d;
}

.sb_forms_editable button:hover{
	background-color:#e2b370;
}

*/
sb.forms.editable.text = function(params){
	if(!params.element){
		throw('You must define the element with sb.forms.editable.text');
	}
	this.element = $(params.element);
	if(this.element.sb_editor){
		return this.element.editor;
	}
	
	sb.objects.infuse(params, this);
	this.element.sb_editor = this;

	this.className = params.className || 'sb_forms_editable';
};

sb.forms.editable.text.prototype = {

	/**
	@Name: sb.forms.editable.text.onBeforeEdit
	@Description: Fires before editing begins.  Can be used to load raw data with ajax
	to fill the textarea with.  Reference the textarea with this.textarea.  The default is
	to use the innerHTML of the area being edited
	@Example:
	editor.onBeforeEdit = function(){
		this.setValue('loading...');
		var editor = this;

		var aj = new sb.ajax({
			url : '/url/rawtext',
			data : {
				doc_id : doc_id
			},
			onResponse : function(raw_desc){
				editor.setValue(raw_desc);
			}
		}).fetch();
	};
	*/
	onBeforeEdit : function(){
		this.setValue(this.element.innerHTML);
	},

	/**
	@Name: sb.forms.editable.text.onSave
	@Description: Passes the value of the textarea for you to save back with ajax
	@Param string save The value of the textarea when save if fired
	editor.onSave = function(){
		if(value != 'loading...'){
			var editor = this;
			var aj = new sb.ajax({
				url : '/url/save',
				data : {
					doc_id : doc_id,
					value : value
				},
				onResponse : function(html){
					editor.setHTML(html);
				}
			}).fetch();
		}
	};

	*/
	onSave : function(value){},
	
	/**
	@Name: sb.forms.editable.text.onButtonPress
	@Description: Fires when a button is pressed other than save or cancel
	@Param event e The press event
	@Example:
	editor.onButtonPress = function(e){
		var button = e.target;
	};
	*/
	onButtonPress : function(e){},

	/**
	@Name: sb.forms.editable.text.setValue
	@Description: Sets the value of the textarea, use in onBeforeEdit after loading raw text from ajax
	@Example:
	editor.setValue('text to edit');
	*/
	setValue : function(value){
		this.textarea.value = value;
		this.focus();
	},

	/**
	@Name: sb.forms.editable.text.setHTML
	@Description: Sets the html of the element being edited, use in onSave after saving
	@Example:
	editor.setHTML('<p>text that was edited</p>');
	*/
	setHTML : function(html){
		this.element.innerHTML = html;
		this.editStop();
	},

	/**
	@Name: sb.forms.editable.text.edit
	@Description: Put the editor in edit mode
	@Example:
	editor.edit(target);
	*/
	edit : function(){
		if(!this.editor){
			this.create();
		}
		this.editor.title = 'shortcuts: esc to cancel, ctrl+s to save';
		
		this.editor.replace(this.element);
		
		if(typeof this.onBeforeEdit == 'function'){
			this.onBeforeEdit.call(this);
		}
	},

	/**
	@Name: sb.forms.editable.text.editStop
	@Description: Exit edit mode
	@Example:
	editor.editStop();
	*/
	editStop : function(){
	
		this.element.replace(this.editor);
		this._origValue = '';
	},

	/**
	@Name: sb.forms.editable.text.focus
	@Description: Focuses on text area and puts cursor at top left. automatically fires after setValue
	@Example:
	editor.focus();
	*/
	focus : function(){
		var ta = this.textarea;
		var range;
		if (this.textarea.setSelectionRange) {
			this.textarea.setSelectionRange(0, 0);
		} else if(this.textarea.createTextRange){
			range = this.textarea.createTextRange();
			range.collapse(true);
			range.moveStart("character", 0);
			range.moveEnd("character", 0 - 0);
			range.select();
		}
		this.textarea.focus();

	},

	/**
	@Name: sb.forms.editable.text.addButton
	@Description: Adds a button to the editBar
	@Param string str The name of the button to add
	@Example:
	editor.addButton('email');
	*/
	addButton : function(str){
		this.editBar.innerHTML = '<button>'+str+'</button>'+this.editBar.innerHTML;

	},

	/**
	@Name: sb.forms.editable.text.isNotEdited
	@Description: Determines if field is edited or not
	@Example:
	if(editor.isNotEdited()){}
	*/
	isNotEdited : function(){
		return !this._origValue || this._origValue == this.textarea.value;
	},

	/**
	@Name: sb.forms.editable.text.editStop
	@Description: Used internally Creates editor
	*/
	create : function(){
		var self = this;
		if(!this.editor){
			this.editor = new sb.element({
				tag : 'div',
				className : self.className
			});

			this.textarea = new sb.element({
				tag : this.type,
				value : this.value,
				className : this.className,
				events : {
					keydown : function(e){

						if(!self._origValue){
							self._origValue = self.textarea.value;
						}

						if(e.keyCode == 9 && self.isNotEdited()){
							self.editStop();
						} else if(e.keyCode == 27){
							self.editStop();
						} else if((e.ctrlKey || e.metaKey) && e.keyCode == 83){
							e.stopPropagation();
							e.preventDefault();
							self.onSave.call(self, self.textarea.value);
						}
					},
					blur : function(e){
						if(self.isNotEdited()){
							self.editStop();
						}

					}
				}
			});

			this.textarea.appendTo(this.editor);

			this.editBar = new sb.element({
				tag : 'editbar',
				innerHTML : '<button>cancel</button><button>save</button>',
				className : this.type,
				events : {
					mousedown : function(e){
						var target = e.target;
						e.preventDefault();
						e.stopPropagation();
						if(target.nodeName == 'BUTTON'){
							
							switch(target.innerHTML){
								case 'save':
									self.onSave(self.textarea.value);
									break;

								case 'cancel':
									self.editStop();
									break;

								default:
									self.onButtonPress(e);
							}
						}
						
						return true;

					}
				}
			});

			this.editBar.appendTo(this.editor);
		}
	}
};