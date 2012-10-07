/*
 * tipJS - Javascript MVC Framework ver.1.20
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "todoMVC.init",
	
	invoke:function(){
		tipJS.log(this.name);
		this.loadModel("globalTodos", true).init();
		this.loadModel("bindAction").bindActions();
		this.loadModel("renderer").render();
	}
});
