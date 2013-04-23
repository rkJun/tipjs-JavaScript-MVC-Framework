tipJS.controller({
	name : "todoMVC.toggleAll",
	
	invoke : function( chkboxAll ){
		tipJS.log(this.name);

		var isChecked = $( chkboxAll ).prop('checked'),
			globalTodos = this.loadModel("globalTodos", true);

		$.each( globalTodos.todos, function( i, val ) {
			val.completed = isChecked;
		});
		this.loadView("renderer").updateView( globalTodos );
		this.loadModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
	}
});
