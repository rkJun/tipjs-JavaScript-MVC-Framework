/*
 * tipJS - Javascript MVC Framework ver.1.000
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "helloWorld.hello",
	invoke:function(params){
		document.getElementById("contents").innerHTML = "<h1>Hello World from " + params + "</h1>";
	}
});
