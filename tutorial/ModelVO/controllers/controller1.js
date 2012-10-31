/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "ModelVO.controller1",
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		
		tipJS.log("##### modelA start #####");
		tipJS.echo(this.loadModel("modelA"));
		tipJS.log("##### modelA finish #####");
		tipJS.log("##### modelVO start #####");
		tipJS.echo(this.loadModel("modelVO"));
		tipJS.log("##### modelVO finish #####");
		document.getElementById("contents").innerHTML = "<h2>check your browser console</h2>";
	}
});
