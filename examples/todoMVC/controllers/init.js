tipJS.controller({
	name : "todoMVC.init",

	invoke : function(){
		tipJS.log(this.name);

		var globalTodos = this.loadModel("globalTodos", true);

		globalTodos.init();
		this.loadView("renderer").updateView( globalTodos );
		this.loadModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
		this.loadModel("bindAction").bindActions();
	}
});
