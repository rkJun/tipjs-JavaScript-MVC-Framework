/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "Controller.invoke",
	beforeInvoke:function(){
		tipJS.debug(this.name + ".beforeInvoke");
		document.getElementById("contents").innerHTML = "<h1>beforeInvoke</h1>";
	},
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		document.getElementById("contents").innerHTML = "<h1>invoke</h1>";
		return false;
	},
	afterInvoke:function(){
		tipJS.debug(this.name + ".afterInvoke");
		document.getElementById("contents").innerHTML = "<h1>afterInvoke</h1>";
	},
	exceptionInvoke:function(){
		tipJS.debug(this.name + ".exceptionInvoke");
		document.getElementById("contents").innerHTML = "<h1>exceptionInvoke</h1>";
	}
});
