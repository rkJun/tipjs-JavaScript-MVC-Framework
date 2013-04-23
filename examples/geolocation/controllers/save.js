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
