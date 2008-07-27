/**
@Name: sb.cookies
@Author: Paul Visco
@Version: 1.2 05/01/08
@Description: Used to handle cookies - which can remember values between client visits
*/
sb.cookies={

	path : '/',
	domain : '',
	onlog : '',
	
	/**
	@Name: sb.cookies.recall
	@Description: Used to recall cookie values
	@Param: String name The name of the cookie who's value you are trying to recall
	@Return: String Returns the value stored for the cookie or false if the cookie is not found
	@Example:
	var answer = recall('myCookie');
	//answer = the value the cookie was set to with sb.cookies.remember
	//if globals are not enabled
	sb.cookies.recall('myCookie', 'paul');
	*/
	recall : function(name){
		
		var i,n, parts = document.cookie.split(';');
		
		for(i=0;i<parts.length;i++){
			n = parts[i].split('=');
			n[0] = n[0].replace(/ /, "");
			
			if(name==n[0]){
				return unescape(n[1]);
			} 
		}
		return false;
	},
	
	/**
	@Name: sb.cookies.remember
	@Description: Used to make the clients computer remember a value as a cookie
	@Param: String name The name (key) of the cookie which will hold the valuee
	@Param: String value The value the cookie holds, remember cookies are limited to <4k
	@Param: Days number The number of days to rememeber the value for. If not set they become session cookies and expire when the user closes the browser
	@Example:
	remember('name', 'paul');
	
	//if globals are not enabled
	sb.cookies.remember('name', 'paul');
	
	*/
	
	remember : function(name, value, days){
        
        var ck, date = new Date();
        var exp = '';
    
        if(days){
            date.setTime(date.getTime()+(days*24*60*60*1000));
            exp = '; expires='+date.toGMTString();
        }
                     
        ck=name+'=' + escape(value) + exp + '; path=' + sb.cookies.path + ';' + ' host=' + sb.cookies.domain;
        
        document.cookie = ck;
                    
    },
	
	/**
	@Name: sb.cookies.forget
	@Description: Used to make the clients computer forget a cookie
	@Param: String name The name (key) of the cookie which will be forgotten
	@Example:
	forget('myCookie');

	//without globals
	sb.cookies.forget('myCookie');
	*/
	forget : function(name){
		this.remember(name, "", -1);
	},
	
	
	/**
	@Name: sb.cookies.forgetAll
	@Description: Forgets all cookies stored for your server
	@Example:
	sb.cookies.forgetAll();
	*/
	forgetAll : function(){
	
		var n,i,deleted =[], parts = document.cookie.split(';');
		for(i=0;i<parts.length;i++){
			n = parts[i].split('=');
			
			if(n[0] !== undefined){
				deleted.push(n[0]);
				this.remember(n[0], "", -1);
			}
		}
	},
	
	/**
	@Name: sb.cookies.listAll
	@Description: Used Internally
	*/
	listAll : function(){
		var i, c, list=[], parts = document.cookie.split(';');
		
		for(i=0;i<parts.length;i++){
			c = parts[i].split('=');
			list.push(c[0].replace(/ /, ""));
		}
		
		return list;
	}
	
};