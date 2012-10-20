/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "geolocation.init",
	invoke:function(){
		tipJS.debug(this.name + " Start");
		
		if (!navigator.geolocation) {
			alert("do not support the Geolocation API");
			return;
		}
		
		// get the googleMap Model
		var googleMap = this.loadModel("googleMap");
		var globalModel = this.loadModel("globalModelVO", true);
		// Displayed map in the page
		globalModel.googleMap = googleMap.getGoogleMap();
		
		this.setEventListeners();
		
		tipJS.debug(this.name + " Done");
	},
	setEventListeners:function(){
		// Show my location
		document.getElementById("btGet").addEventListener("click", function(){
			tipJS.action("geolocation.get");
		}, true);
		// Stop tracking my location
		document.getElementById("btStop").addEventListener("click", function(){
			tipJS.action("geolocation.stop");
		}, true);
		// Save my current location
		document.getElementById("btSave").addEventListener("click", function(){
			tipJS.action("geolocation.save");
		}, true);
		// Load saved location
		document.getElementById("btLoad").addEventListener("click", function(){
			tipJS.action("geolocation.load");
		}, true);
	}
});
