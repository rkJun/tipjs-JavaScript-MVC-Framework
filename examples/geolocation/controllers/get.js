/*
 * tipJS - Javascript MVC Framework ver.1.17
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "geolocation.get",
	invoke:function(params){
		tipJS.debug(this.name + " Start");
		
		var option = {
			maximumAge : 0,
			enableHighAccuracy : true,
			timeout : 1*60*1000
		}
		globalWatchID = navigator.geolocation.watchPosition(this.onSuccess, this.onError, option);
		
		tipJS.debug(this.name + " Done");
	},
	// Success Handler
	onSuccess:function(position){
		globalLatitude = position.coords.latitude;
		globalLongitude = position.coords.longitude;
		
		if (!globalMarker) {
			globalGoogleMap.setZoom(13);
		}
		
		// get the googleMap Model
		var googleMap = tipJS.loadModel("geolocation.googleMap");
		googleMap.setGoogleMap(globalGoogleMap);
		
		var currentPosition = googleMap.setMapPosition(globalLatitude, globalLongitude);
		googleMap.clearMapMarker(globalMarker);
		globalMarker = googleMap.makeMapMarker(currentPosition);
	},
	// Error Handler
	onError:function(error){
		alert(error.code);
	}
});
