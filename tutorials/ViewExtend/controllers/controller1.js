tipJS.controller({
	name : "ViewExtend.controller1",
	invoke:function(params){
		tipJS.debug(this.name + ".invoke");
		var viewChild = this.loadView("viewChild");
		tipJS.echo(viewChild);
		viewChild.commonFn();
		viewChild.commonFn2();
		viewChild.parentFn();
		viewChild.childFn();
	}
});
