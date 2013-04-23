tipJS.controller({
	name : "todoMVC.blurOnEnter",

	invoke : function( evt ){
		tipJS.log(this.name);

		if ( evt.keyCode === this.loadModel("globalTodos", true).ENTER_KEY ) {
			evt.target.blur();
		}
	}
});
