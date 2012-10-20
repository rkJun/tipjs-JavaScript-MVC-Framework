/*
 * tipJS - Javascript MVC Framework ver.1.21
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
		// load Model on synchronized Mode
		var globalModel = this.loadModel("globalModelVO", true);
		// globalWatchID
		if(globalModel.watchID == null){
			alert("do nothing");
			return;
		}
		navigator.geolocation.clearWatch(globalModel.watchID);
		// clear
		globalModel.watchID = null;
		
		tipJS.debug(this.name + " Done");
	}
});
