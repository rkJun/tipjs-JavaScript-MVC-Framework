tipJS.controller({
	name : "ModelExtend.controller1",
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		var modelChild = this.loadModel("modelChildVO");
		tipJS.echo(modelChild);
		modelChild.commonFn();
		modelChild.commonFn2();
		modelChild.parentFn();
		modelChild.childFn();
	}
});
