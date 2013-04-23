tipJS.controller({
	name : "ModelSync.controller1",
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		
		var modelA = this.loadModel("modelA");
		var modelB = this.loadModel("modelB", true);
		
		tipJS.debug( modelA.name );
		document.getElementById("contentsA").innerHTML = modelA.name;
		modelA.name = "modelC";
		
		tipJS.debug( modelB.name );
		document.getElementById("contentsB").innerHTML = modelB.name;
		modelB.name = "modelC";
		
	}
});
