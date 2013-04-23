tipJS.controller({
	name : "todoMVC.destroy",

	invoke : function( btn ){
		tipJS.log(this.name);

		var globalTodos = this.loadModel("globalTodos", true),
			renderer = this.loadView("renderer"),
			utils = this.loadModel("utils");

		globalTodos.getTodo( btn, function( i ) {
			globalTodos.todos.splice( i, 1 );
			renderer.updateView( globalTodos );
			utils.store( globalTodos.STORE_KEY, globalTodos.todos );
		});
	}
});
