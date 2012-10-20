/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "geolocation.save",
	invoke:function(params){
		tipJS.debug(this.name + " Start");
		
		// load Model on synchronized Mode
		var globalModel = this.loadModel("globalModelVO", true);
		
		var saveObj = {
			latitude : globalModel.latitude,
			longitude : globalModel.longitude
		}
		try{
			window.localStorage.setItem("geolocation", JSON.stringify(saveObj));
		}catch(e){
			alert("could not be saved to local storage");
			return;
		}
		alert("saved the location information");
		
		tipJS.debug(this.name + " Done");
	}
});
