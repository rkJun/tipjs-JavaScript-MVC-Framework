/*
 * tipJS - Javascript MVC Framework ver.1.17
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "geolocation.load",
	invoke:function(params){
		tipJS.debug(this.name + " Start");
		var loadObj = window.localStorage.getItem("geolocation");
		if (loadObj == null){
			alert("No data error");
			return;
		}
		// load Model on synchronized Mode
		var globalModel = this.loadModel("globalModel", true);
		var loadData = JSON.parse(loadObj);
		globalModel.latitude = loadData.latitude;
		globalModel.longitude = loadData.longitude;
		
		// get the googleMap Model
		var googleMap = this.loadModel("googleMap");
		googleMap.setGoogleMap(globalModel.googleMap);
		
		var currentPosition = googleMap.setMapPosition(globalModel.latitude, globalModel.longitude);
		googleMap.clearMapMarker(globalModel.marker);
		globalModel.marker = googleMap.makeMapMarker(currentPosition);
		
		tipJS.debug(this.name + " Done");
	}
});
