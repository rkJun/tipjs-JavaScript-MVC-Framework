tipJS.controller({
	name : "Interceptor.ctrl02",
	invoke:function(params){
		this.getById("screen").innerHTML = "Controller 02";
	}
});
