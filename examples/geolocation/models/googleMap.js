/*
 * tipJS - Javascript MVC Framework ver.1.17
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model({
	name:"geolocation.googleMap",
	mapObject:null,
	getGoogleMap:function(){
		// load Model on synchronized Mode
		var globalModel = this.loadModel("globalModel", true);
		
		return new google.maps.Map(document.getElementById("googleMap"), {
			zoom : 1,
			center : new google.maps.LatLng(globalModel.latitude, globalModel.longitude),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});
	},
	setGoogleMap:function(map){
		this.mapObject = map;
	},
	setMapPosition:function(latitude, longitude){
		// Set the map position
		var position = new google.maps.LatLng(latitude, longitude);
		this.mapObject.setCenter(position);
		return position;
	},
	clearMapMarker:function(marker){
		// clear the map marker
		if (marker){
			marker.setMap(null); // remove marker
		}
	},
	makeMapMarker:function(position){
		// make the map marker
		return new google.maps.Marker({
			position: position,
			map: this.mapObject
		});
	}
});
