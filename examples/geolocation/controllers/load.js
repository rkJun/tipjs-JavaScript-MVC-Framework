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
		var loadData = JSON.parse(loadObj);
		globalLatitude = loadData.latitude;
		globalLongitude = loadData.longitude;
		
		// get the googleMap Model
		var googleMap = this.loadModel("googleMap");
		googleMap.setGoogleMap(globalGoogleMap);
		
		var currentPosition = googleMap.setMapPosition(globalLatitude, globalLongitude);
		googleMap.clearMapMarker(globalMarker);
		globalMarker = googleMap.makeMapMarker(currentPosition);
		
		tipJS.debug(this.name + " Done");
	}
});
