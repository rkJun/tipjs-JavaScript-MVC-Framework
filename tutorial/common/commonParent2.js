/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.commonModel({
	__name : "commonParent2",
	common2 : "commonParent2 property",
	commonFn2 : function(){
		tipJS.debug("commonParent2.commonFn2()");
		tipJS.debug(this.common2);
		
		document.getElementById("contents").innerHTML += "<h1>" + this.common2 + "</h1>";
	}
});
