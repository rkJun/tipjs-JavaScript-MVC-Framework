tipJS.controller({
	name : "View.controller1",
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		
		this.loadView("viewA").methodA();
	}
});
