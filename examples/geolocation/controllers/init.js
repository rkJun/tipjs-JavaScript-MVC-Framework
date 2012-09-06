/*
 * tipJS - Javascript MVC Framework ver.1.17
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
		
		// Displayed map in the page
		globalGoogleMap = googleMap.getGoogleMap();
		
		this.setEventListeners();
		
		tipJS.debug(this.name + " Done");
	},
	setEventListeners:function(){
		// Gets the position information
		document.getElementById("btGet").addEventListener("click", function(){
			tipJS.action("geolocation.get");
		}, true);
		// Stop the acquisition of the position information
		document.getElementById("btStop").addEventListener("click", function(){
			tipJS.action("geolocation.stop");
		}, true);
		// Save the position information
		document.getElementById("btSave").addEventListener("click", function(){
			tipJS.action("geolocation.save");
		}, true);
		// Load the position information stored
		document.getElementById("btLoad").addEventListener("click", function(){
			tipJS.action("geolocation.load");
		}, true);
	}
});
