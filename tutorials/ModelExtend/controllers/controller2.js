tipJS.controller({
	name : "ModelExtend.controller2",
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		var modelChild = this.loadModel("modelChild2VO");
		tipJS.echo(modelChild);
		modelChild.commonFn();
		modelChild.commonFn2();
		modelChild.commonFn3();
		modelChild.parentFn();
		modelChild.childFn();
	}
});
