/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "Controller.async",
	async : true,
	beforeInvoke:function(){
		tipJS.debug(this.name + ".beforeInvoke");
	},
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		for (var i=0; i<5000; i++) {
			document.getElementById("contentsHidden").innerHTML += "a";
		}
		document.getElementById("contents").innerHTML = "<h1>Hello tipJS.com</h1>";
	},
	afterInvoke:function(){
		tipJS.debug(this.name + ".afterInvoke");
	},
	exceptionInvoke:function(){
		tipJS.debug(this.name + ".exceptionInvoke");
	}
});
