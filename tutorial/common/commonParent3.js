/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.commonModel({
	__name : "commonParent3",
	common3 : "commonParent3 property",
	commonFn3 : function(){
		tipJS.debug("commonParent3.commonFn3()");
		tipJS.debug(this.common3);
		
		document.getElementById("contents").innerHTML += "<h1>" + this.common3 + "</h1>";
	}
});
