/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "helloWorldTpl.hello",
	invoke:function(params){
		var _templateConfig = {
			url:"./templates/helloWorld.tpl",
			renderTo:"contents",
			data:{
				helloworld:"Hello World from " + params
			}
		};
		this.renderTemplate(_templateConfig);
	}
});
