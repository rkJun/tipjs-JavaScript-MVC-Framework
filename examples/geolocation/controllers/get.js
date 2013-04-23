tipJS.controller({
	name : "geolocation.get",
	invoke:function(params){
		tipJS.debug(this.name + " Start");
		
		var option = {
			maximumAge : 0,
			enableHighAccuracy : true,
			timeout : 1*60*1000
		}
		// load Model on synchronized Mode
		var globalModel = this.loadModel("globalModelVO", true);
		globalModel.watchID = navigator.geolocation.watchPosition(this.onSuccess, this.onError, option);
		
		tipJS.debug(this.name + " Done");
	},
	// Success Handler
	onSuccess:function(position){
		// load Model on synchronized Mode
		var globalModel = tipJS.loadModel("geolocation.globalModelVO", true);
		globalModel.latitude = position.coords.latitude;
		globalModel.longitude = position.coords.longitude;
		
		globalModel.googleMap.setZoom(13);
		
		// get the googleMap Model
		var googleMap = tipJS.loadModel("geolocation.googleMap");
		googleMap.setGoogleMap(globalModel.googleMap);
		
		var currentPosition = googleMap.setMapPosition(globalModel.latitude, globalModel.longitude);
		googleMap.clearMapMarker(globalModel.marker);
		globalModel.marker = googleMap.makeMapMarker(currentPosition);
	},
	// Error Handler
	onError:function(error){
		alert(error.code);
	}
});
