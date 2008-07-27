/**
@Author: Paul Visco of http://elmwoodstrip.org?u=paul
@Version: 4.01
@Release: 02/12/08
@Package: surebert.flashGate
@Desciption: Allows communications between surebert.swf flashGlate and the surebert toolkit, extending javascript by allowing it to borrow functionality from flash.  Currently it can play sounds, save data to the flash storage space, and allow multi file uploads.
*/

if(typeof sb.swf =='undefined'){
	sb.include('swf');
}

/**
@Name: sb.flashGateDebug
@Description: Boolean Determines if the surebert.swf debugs actions to the sb.consol.  Requires sb.developer.
*/
sb.flashGateDebug = 0;

/**
@Name: sb.onFlashGateLoad
@Description: An array of functions that should fire when the sb.flashGate loads.  You can push functions in here to have them fire when the flashGate loads.
*/
sb.onFlashGateLoad = [];

/**
@Name: sb.sound
@Description: A constructor for creating new sound object instances.  Allows javascript to load, play and stop mp3 sounds.  Also has hooks for changing pan(left and right speaker), volume, and position of track, and reading id3 tag data from the song.
@Param String url The address of the sound file e.g. http://myexample.com/mySound.mp3
@Param Number vol The volume to play the song at
@Example:
var mySound = new sb.sound('http://myexample.com/mySound.mp3);
mySound.play();
*/

sb.sound = function(url, vol){
	
	if(typeof url == 'undefined'){return;}
	this.url = url;
	this.vol = vol || sb.sound.globalVolume;
	sb.sound.sounds.push(this);
}; 

//add infuse in case globals are turned off
sb.sound.infuse = sb.objects.infuse;
	
sb.sound.infuse({
	
	/**
	@Name: sb.sound.stopAll
	@Description: Stops all sounds currently on the page
	@Example:
	sb.sounds.stopAll();
	*/
	stopAll : function(){
		sb.sound.sounds.forEach(function(v){
			v.stop();
		});
	},
	
	/**
	@Name: sb.sound.muteAll
	@Description: Mutes all sounds currently on the page, does not stop them from playing.
	@Example:
	sb.sounds.muteAll();
	*/
	muteAll : function(){
		sb.sound.sounds.forEach(function(v){
			v.setVolume(0);
		});
	},
	
	/**
	@Name: sb.sound.globalVolume
	@Description: The globalVolume on the page
	*/
	globalVolume : 50,

	/**
	@Name: sb.sound.sounds
	@Description: An array of all the sound object instances on the page.
	*/
	
	sounds : [],
	
	/**
	@Name: sb.sound.muted
	@Description: When set to 0 all sounds on the page are not muted when set to 1 all sounds are muted
	*/
	muted : 0,
	
	/**
	@Name: sb.sound.handlers
	@Description: Used internally. Passes events to individual sound instances when the events fire from the flash flashGate.
	*/
	handlers : {
		/**
		@Name: sb.sound.handlers.oncomplete
		@Description: Used internally. Fires when a sound is completed and triggers the firing of the sound instances oncomplete handler if it exists
		*/
		oncomplete : function(info){
			if(typeof sb.sound.sounds[info.id].oncomplete=='function'){
				sb.sound.sounds[info.id].oncomplete(info);
			}
		},
		/**
		@Name: sb.sound.handlers.onid3
		@Description: Used internally. Fires when a sound's id3 data is loaded and triggers the firing of the sound instance's onid3 handler if it exists
		*/
		onid3 : function(info){
			if(typeof sb.sound.sounds[info.id].onid3=='function'){
				sb.sound.sounds[info.id].onid3(info);
			}
		},
		/**
		@Name: sb.sound.handlers.onload
		@Description: Used internally. Fires when a sound is onload and triggers the firing of the sound instances onload handler if it exists
		*/
		onload : function(info){
			if(typeof sb.sound.sounds[info.id].onload=='function'){
				sb.sound.sounds[info.id].onload(info);
			}
		}
	}
});


/**
@Name: sb.sound.prototype
@Description: The properties and methods of all sound object instances.  All examples refer to a sound object instance called mySound which was created like this
@Example:
var mySound = new sb.sound('http://myexample.com/mySound.mp3);
*/
sb.sound.prototype = {
	
	/**
	@Name: sb.sound.prototype.playing
	@Description: Boolean The playing status of a sound object. 0 = not playing, 1 is playing
	*/
	playing :0,
	
	/**
	@Name: sb.sound.prototype.play
	@Description: Function Plays the sound file specified in the url property of the sound object.
	@Param: Number vol The volume to play the sound at measured between 0 and 100
	@Example:
	mySound.play();
	*/
	play : function(vol){
		if(typeof sb.flashGateInit=='undefined'){
			
			if(typeof this.interval !='undefined'){return;}
			
			var t=this;
			this.tries = 0;
			this.interval = window.setInterval(function(){
				if(typeof sb.flashGateInit !='undefined'){
					t.play();
					window.clearInterval(t.interval);
				}
				this.tries++;
				
				if(this.tries > 10){
					window.clearInterval(t.interval);
					sb.consol.error(sb.messages[16]+t.url);
				}
			}, 100);
			
			return;
		}
		
		if(sb.sound.muted===1){return;}
		vol = vol || this.vol;
		if(typeof this.id == 'undefined'){
			
			this.id = sb.flashGate.soundCreate(this.url, vol);
		} else {
			this.setVolume(vol);
			this.start();
		}
		return this.id;
	},
	
	/**
	@Name: sb.sound.prototype.start
	@Description: Function Starts a sound if it was stopped
	@Example:
	mySound.start();
	*/
	start : function(){
		this.playing =1;
		sb.flashGate.soundStart(this.id);
	},
	
	/**
	@Name: sb.sound.prototype.stop
	@Description: Function Stops a sound taht was started
	@Example:
	mySound.stop();
	*/
	stop : function(){
		this.playing =0;
		sb.flashGate.soundStop(this.id);
	},
	
	/**
	@Name: sb.sound.prototype.setVolume
	@Description: Function Sets the volume of a sound object instance
	@Param Number vol The volume measured between 0 and 100
	@Example:
	mySound.setVolume(20);
	*/
	setVolume : function(vol){
		sb.flashGate.soundSetVolume(this.id, vol);
	},
	
	/**
	@Name: sb.sound.prototype.mute
	@Description: Function Mutes the volume of a sound object instance
	@Example:
	mySound.mute();
	*/
	mute : function(){
		this.setVolume(0);
	},
	
	/**
	@Name: sb.sound.prototype.setPan
	@Description: Function Sets the pan of a soudn object instance
	@Param: Number pan Pan bewteen -100 (far left) and 100 (far right)
	@Param: String pan You can also pass it the shortcuts 'left', right', 'middle'
	@Example:
	mySound.setPan('left');
	mySound.setPan(-100);
	*/
	setPan : function(pan){
		switch(pan){
			case 'left':
				pan = -100;
				break;
			case 'right':
				pan = 100;
				break;
			case 'middle':
				pan = 0;
				break;
		}
		
		sb.flashGate.soundSetPan(this.id, pan);
	},
	
	/**
	@Name: sb.sound.prototype.getPan
	@Description: Function Gets the pan of a sound object instance
	@Return: Number Pan between -100(far left) and 100(far right)
	@Example:
	var pan = mySound.getPan();
	//pan = -100 //<-possible result
	*/
	getPan : function(){
		return sb.flashGate.soundGetPan(this.id);
	},
	
	/**
	@Name: sb.sound.prototype.setPosition
	@Description: Function Sets the position of a sound object instance
	@Param: Number position A position between 0% and 100%
	@Example:
	//sets the sound position to 50%
	mySound.setPosition(50);
	*/
	setPosition : function(position){
		sb.flashGate.soundSetPosition(this.id, position);
	},
	
	/**
	@Name: sb.sound.prototype.getPosition
	@Description: Function Gets the position of a sound object instance
	@Example:
	var post = mySound.getPosition(50);
	//pan = 50 //<-possible result
	*/
	getPosition : function(){
		return sb.flashGate.soundGetPosition(this.id);
	}
	
};

/**
@Name: sb.sharedObject
@Description: Object Allows the sotring and retreiving of data in the flash shared object space on the client's computer.  This space is virtually unlimited and is not emptied when a user empties their cookies.  The calls work exactly the same as with sb.cookies.
*/
sb.sharedObject = {

	/**
	@Name: sb.sharedObject.remember
	@Description: Used to make the clients computer remember a value as a in the flash shared object space
	@Param: String name The name (key) of the cookie which will hold the valuee
	@Param: String value The value the cookie holds
	@Example:
	sb.sharedObject.remember('name', 'paul');
	*/
	remember :function(key, v){
	
		try{
			sb.flashGate.remember(key,escape(v));
		} catch(e){
			window.setTimeout(function(){sb.sharedObject.remember(key,v);}, 1000);
		}
	},
	
	/**
	@Name: sb.sharedObject.recall
	@Description: Used to recall flash shared object stored values
	@Param: String name The name of the shared object who's value you are trying to recall
	@Return: String Returns the value stored for the shared object or false if the shared object is not found
	@Example:
	var answer = sb.sharedObject.recall('myData');
	//answer = the value the shared object was set to with sb.sharedObject.remember
	*/
	recall : function(key){
		try{
			var val = unescape(sb.flashGate.recall(key));
			if(val == 'null'){return false;} else {return val;}
		} catch(e){return false;}
	},
	
	/**
	@Name: sb.sharedObject.forget
	@Description: Used to make the clients computer forget a flash shared object stored value
	@Param: String name The name (key) of the shared object which will be forgotten
	@Example:
	sb.sharedObject.forget('myData');
	*/
	forget : function(key){
		try{
			sb.flashGate.forget(key);
		} catch(e){return false;}
		return true;
	}
};

/**
@Name: sb.uploadHandlers
@Description: These are the upload handlers for multi file uploads.  You would override them in your own code, they are simply here to provide an overview of which handlers exist.
*/
sb.uploadHandlers = {
	
	/**
	@Name: sb.uploadHandlers.onSelect
	@Description: Fires if when the files are selected from the browse box and the user hits upload
	@Example:
	sb.uploadHandlers.onSelect = function(file){
		alert('uploading begins');
	}
	*/
	onSelect : function(total){
		
	},
	
	/**
	@Name: sb.uploadHandlers.onAllComplete
	@Description: Fires if amd when all files have completed uploading
	@Example:
	sb.uploadHandlers.onAllComplete = function(file){
		alert('uploading complete');
	}
	*/
	onAllComplete : function(data){},
	
	/**
	@Name: sb.uploadHandlers.onAllProgress
	@Description: Fires after each file finsihed uploading to report total and remaing files
	@Example:
	sb.uploadHandlers.onAllProgress = function(files){
		alert(files.total+' '+files.percent+' '+files.remaining);
	}
	
	//the files object passed has the following properties
	files = {
		total : 4,
		remaining : 3
	}
	*/
	onAllProgress : function(files){},
	
	/**
	@Name: sb.uploadHandlers.onCancel
	@Description: Fires if the user hits the cancel button in the file browser window
	@Example:
	sb.uploadHandlers.onCancel = function(file){
		alert('user has canceled upload');
	}
	*/
	onCancel : function(){},
	
	/**
	@Name: sb.uploadHandlers.onOpen
	@Description: Fires when the user opens the file locally for upload by clicking the upload button in the file browser.  Each file will fire an onstart event of its it own and the properties of the file are passed as the only argument to this handler. e.g.
	@Example:
	sb.uploadHandlers.onOpen = function(file){
		alert(file.name+' has started uploading');
	}
	
	//the file object passed has the following properties
	file = {
		name : 'New Ride Banner.jpg',
		size : 417310,
		type : '.jpg'
	}
	*/
	onOpen : function(file){},
	
	/**
	@Name: sb.uploadHandlers.onComplete
	@Description: Fires when the file finishes uploading. Each file will fire an oncomplete event of its it own and the properties of the file are passed as the only argument to this handler.
	@Example:
	sb.uploadHandlers.onComplete = function(file){
		alert(file.name+' has been uploaded');
	}
	
	//the file object passed has the following properties
	file = {
		name : 'New Ride Banner.jpg',
		size : 417310,
		type : '.jpg'
	}
	*/
	onComplete : function(file){},
	
	/**
	@Name: sb.uploadHandlers.onProgress
	@Description: Fires incrementally as the upload progressed. Each file will fire an onprogress event of its it own and the properties of the file are passed as the only argument to this handler.  The example assumes you make a paragraph with an id of 'file1', 'file2', 'file3', etc for every file uploaded during the onstart handler.  It then updates the progress each time the onprogress handler fires for that file.  Remember, every file fires it's onprogress progressively as it uploads and passes it's properties as the only argument
	@Example:
	sb.uploadHandlers.onProgress = function(file){
		//sets the innerHTML of the element with id 'file1' to the percent of the file
		$('#file1').innerHTML = (file.bytesLoaded/file.bytesTotal)*100+' %';
	}
	
	//the file object passed has the following properties
	file = {
		name : 'New Ride Banner.jpg',
		size : 417310,
		type : '.jpg'
		bytesLoaded : 22,
		bytesTotal : 417310
		
	}
	
	//the files object passed has the following properties
	files = {
		total : 4,
		remaining : 3
	}
	*/
	onProgress : function(file, files){},
	
	/**
	@Name: sb.uploadHandlers.onReturnData
	@Description: Fires if any return data is provided by the upload script.  Return data is only avaiable when user uploads from Flash Player 9 or greater
	@Example:
	sb.uploadHandlers.onReturnData = function(file){
		sb.objects.alert(file);
	}
	
	file = {
		name : 'New Ride Banner.jpg',
		size : 417310,
		type : '.jpg'
		data : 'whatever data is sent back from your serverside script
		
	}
	*/
	onReturnData : function(data){},
	
	/**
	@Name: sb.uploadHandlers.onError
	@Description: Fires if an error occurs. Passes an error object to the handler
	*/
	onError : function(e){},
	
	/**
	@Name: sb.uploadHandlers.onExceedsMaxFiles
	@Description: Fires when the number of files selected outnumber the maxFiles set in the sb.upload call
	@Example: 
	sb.uploadHandlers.onExceedsMaxFileSizeK : function(file){
		alert("File "+file.name+" exceeds file limit of '+file.limit+'k by '+file.exceededBy+'k and will not be uploaded');
	};
	
	file = {
		name : 'test.jpg',
		sizeK : 12,
		exceededBy : 6,
		limit : 6
	*/
	onExceedsMaxFileSizeK : function(info){},
	
		/**
	@Name: sb.uploadHandlers.onExceedsMaxFiles
	@Description: Fires when the number of files selected outnumber the maxFiles set in the sb.upload call
	@Example:
	sb.uploadHandlers.onExceedsMaxFiles : function(info){
		alert("You have chosen "+info.chosen+".  Please select only "+info.limit);
	};
	
	info = {
		chosen : 6,
		limit : 3
	}
	*/
	onExceedsMaxFiles : function(info){
		alert("You have chosen "+info.chosen+".  Please select only "+info.limit);
	}
};



/**
@Name: sb.upload
@Description: Used to upload files.
@Param Object param An object which set the file type accepted, serveside script, passes data, sets max file size in K and max number of files.
@Example: 
sb.upload({
	acceptedFileTypes: '*',
	serverSideScript : '../data/upload.php?s='+sb.cookies.recall('PHPSESSID'),
	maxFiles : 10,
	maxFileSizeK : 1000000
});
*/
sb.upload = function(param){
	sb.consol.error(sb.messages[15]);
};

/**
@Name: sb.getBandwidth();
@Description: Used to get the bandwidth of the client in kpbs
@Param Object param An object which set the file type accepted, serveside script, passes data, sets max file size in K and max number of files.
@Example: 
sb.getBandwidth();
*/
sb.getBandwidth = function(){
	sb.consol.error(sb.messages[15]);
};

/**
@Name: sb.bandwidthTest
@Description: Handlers that fire when sb.flashGate.getBandwidth(); if fired
*/
sb.bandwidthTest = {
	
	/**
	@Name: sb.bandwidthTest.onComplete
	@Description: fires when an sb.stciker.getBandwidth test is complete and passes it one object with the following properties.
	o.kbps Integer The number of kilobytes per second
	*/
	onComplete : function(o){},
	
	/*
	o.kb Float The current number of kilobytes loads
	o.time Integer The current amount of time passed in milliseconds
	*/
	onProgress: function(o){
	}
};

/**
@Name: sb.flashGateLoaded
@Description: Fires when flashGate loads.  To make events fire after stciker loads push them into the sb.onFlashGateLoad array
*/
sb.flashGateLoaded = function(){
	window.setTimeout(
		function(){
		
			if(sb.flashGateInit === undefined){
				
				sb.getBandwidth = function(){
					sb.flashGate.getBandwidth();
				};
				
				sb.upload = function(params){
					sb.flashGate.upload(params);
				};
				
				sb.upload.cancel = function(){
					sb.flashGate.cancel();
				};
				
				sb.setFlashGateDebug = function(state){
					
					sb.flashGateDebug = state;
					sb.flashGate.setDebug(state);
				};
				
				sb.onFlashGateLoad.forEach(function(v){
					if(typeof v =='function'){v();}
				});
				
				sb.flashGateInit=1;
				
				if(sb.flashGateDebug ==1){
					
					sb.setFlashGateDebug(1);
				}
			}
	}, 5);
	
	
};

sb.flashGateInclude = function(){
	
	var surebertSwf = new sb.element({
		id : 'surebertSwf',
		tag : 'div',
		styles : {
			width : '1px',height : '1px'
		}
		
	});
	surebertSwf.appendToTop(document.body);
	
	if(sb.browser.agent =='ff'){
		
		if(window.screenX < 0){
			var screenX =(window.screenX*-1)+20;
			surebertSwf.mv((window.screenX*-1)+20,0,999);
		}
	}
	
	sb.swfBox = new sb.swf({
		src : sb.base+'/surebert.swf',
		width : 1,
		height : 1,
		bgColor :'#000000',
		wmode: 'transparent'
	});
	
	sb.swfBox.id = 'sb_flashGate';
	sb.flashGate = sb.swfBox.embed(surebertSwf);
	
	
};

/**
@Description: Check the surebert flashGate sound system by loading an mp3 from surebert.com
@Param string mp3 An optional paramter that allows you to specify the mp3 to play by url
*/
sb.soundCheck = function(mp3){
	var snd = new sb.sound(mp3 || 'http://surebert.com/song.mp3');
	snd.play();
	return snd;
};

sb.dom.onReady({
	id : 'body',
	onReady : function(){
		sb.flashGateInclude();
	},
	interval : 10,
	tries : 600
});