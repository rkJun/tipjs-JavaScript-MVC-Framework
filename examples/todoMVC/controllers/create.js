/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller({
	name : "todoMVC.create",
	
	invoke:function(params){
		tipJS.log(this.name);
		var globalTodos = this.loadModel("globalTodos", true);
		var utils = this.loadModel("utils");
		var $input = params.input,
			e = params.event,
			val = $.trim( $input.val() );
		if ( e.which !== globalTodos.ENTER_KEY || !val ) {
			return;
		}
		globalTodos.todos.push({
			id: utils.uuid(),
			title: val,
			completed: false
		});
		$input.val('');
		this.loadModel("renderer").render();
	}
});
