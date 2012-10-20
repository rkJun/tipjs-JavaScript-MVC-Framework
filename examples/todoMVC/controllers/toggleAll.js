/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "todoMVC.toggleAll",
	
	invoke:function(chkboxAll){
		tipJS.log(this.name);
		var isChecked = $( chkboxAll ).prop('checked');
		$.each( this.loadModel("globalTodos", true).todos, function( i, val ) {
			val.completed = isChecked;
		});
		this.loadModel("renderer").render();
	}
});
