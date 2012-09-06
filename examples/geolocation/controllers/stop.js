/*
 * tipJS - Javascript MVC Framework ver.1.17
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "geolocation.stop",
	invoke:function(params){
		tipJS.debug(this.name + " Start");
		
		// globalWatchID
		if(globalWatchID == null){
			alert("do nothing");
			return;
		}
		navigator.geolocation.clearWatch(globalWatchID);
		// clear
		globalWatchID = null;
		
		tipJS.debug(this.name + " Done");
	}
});
