/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.commonModel({
	__name : "commonParent",
	__extend:"commonParent2",
	common : "commonParent property",
	commonFn : function(){
		tipJS.debug("commonParent.commonFn()");
		tipJS.debug(this.common);
		
		document.getElementById("contents").innerHTML += "<h1>" + this.common + "</h1>";
	}
});
