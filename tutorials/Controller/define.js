tipJS.define({
	name:"Controller",
	controllers:[
		"sync.js",
		"async.js",
		"beforeInvoke.js",
		"invoke.js",
		"afterInvoke.js",
		"exceptionInvoke.js"
	],
	beforeController:function(param){
		tipJS.debug("beforeController");
		if (this.controllerName == "Controller.async" || this.controllerName == "Controller.sync") {
			document.getElementById("contentsHidden").innerHTML = "";
		}
		document.getElementById("contents").innerHTML = "<h2>READY...</h2>";
	},
	afterController:function(param){
		tipJS.debug("afterController");
	}
});

