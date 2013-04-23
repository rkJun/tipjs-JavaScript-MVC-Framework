tipJS.controller({
	name : "todoMVC.destroyCompleted",

	invoke : function(){
		tipJS.log(this.name);

		var globalTodos = this.loadModel("globalTodos", true),
			l = globalTodos.todos.length;

		while ( l-- ) {
			if ( globalTodos.todos[l].completed ) {
				globalTodos.todos.splice( l, 1 );
			}
		}
		this.loadView("renderer").updateView( globalTodos );
		this.loadModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
	}
});
