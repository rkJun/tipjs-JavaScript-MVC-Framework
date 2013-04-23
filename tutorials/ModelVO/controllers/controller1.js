tipJS.controller({
	name : "ModelVO.controller1",
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		
		tipJS.log("##### modelA start #####");
		tipJS.echo(this.loadModel("modelA"));
		tipJS.log("##### modelA finish #####");
		tipJS.log("##### modelVO start #####");
		tipJS.echo(this.loadModel("modelVO"));
		tipJS.log("##### modelVO finish #####");
		document.getElementById("contents").innerHTML = "<h2>check your browser console</h2>";
	}
});
