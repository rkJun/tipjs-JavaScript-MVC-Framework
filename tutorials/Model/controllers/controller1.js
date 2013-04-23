tipJS.controller({
	name : "Model.controller1",
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		
		var ret = this.loadModel("modelB").methodB();
		document.getElementById("contents").innerHTML = "<h1>" + ret + "</h1>";
	}
});
