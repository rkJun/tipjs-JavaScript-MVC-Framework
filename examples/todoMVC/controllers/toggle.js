tipJS.controller({
	name : "todoMVC.toggle",

	invoke : function( chkbox ){
		tipJS.log(this.name);

		var globalTodos = this.loadModel("globalTodos", true);

		globalTodos.getTodo( chkbox, function( i, val ) {
			val.completed = !val.completed;
		});
		this.loadView("renderer").updateView( globalTodos );
		this.loadModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
	}
});
