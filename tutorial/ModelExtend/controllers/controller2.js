/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

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
