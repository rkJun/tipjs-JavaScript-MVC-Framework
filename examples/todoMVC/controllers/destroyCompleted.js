/*
 * tipJS - Javascript MVC Framework ver.1.20
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "todoMVC.destroyCompleted",
	
	invoke:function(){
		tipJS.log(this.name);
		var todos = this.loadModel("globalTodos", true).todos,
			l = todos.length;
		while ( l-- ) {
			if ( todos[l].completed ) {
				todos.splice( l, 1 );
			}
		}
		this.loadModel("renderer").render();
	}
});
