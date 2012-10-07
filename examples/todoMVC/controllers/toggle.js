/*
 * tipJS - Javascript MVC Framework ver.1.20
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "todoMVC.toggle",
	
	invoke:function(chkbox){
		tipJS.log(this.name);
		this.loadModel("globalTodos", true).getTodo( chkbox, function( i, val ) {
			val.completed = !val.completed;
		});
		this.loadModel("renderer").render();
	}
});
