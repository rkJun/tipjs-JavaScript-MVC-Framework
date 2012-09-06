/*
 * tipJS - Javascript MVC Framework ver.1.17
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

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
		"googleMap.js"
	],
	onLoad:function(){
		tipJS.debug(this.name + ".onLoad Start");
		// call Controller
		tipJS.action("geolocation.init");
	}
});

