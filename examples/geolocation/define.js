tipJS.define({
	name:"geolocation",
	controllers:[
		"init.js",
		"get.js",
		"stop.js",
		"save.js",
		"load.js"
	],
	models:[
		"googleMap.js",
		"globalModelVO.js"
	],
	onLoad:function(){
		tipJS.debug(this.name + ".onLoad Start");
		// call Controller
		tipJS.action("geolocation.init");
	}
});

